import Cookies from "js-cookie";

const APP_COOKIE = "language";
const GOOGLE_COOKIE = "googtrans";

const COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
};

const DEFAULT_LANGUAGE = "en";

function current() {
  return Cookies.get(APP_COOKIE) || DEFAULT_LANGUAGE;
}

function save(lang) {
  Cookies.set(APP_COOKIE, lang, COOKIE_OPTIONS);

  const value = `/en/${lang}`;

  Cookies.set(GOOGLE_COOKIE, value, COOKIE_OPTIONS);

  document.cookie = `${GOOGLE_COOKIE}=${value};path=/`;
}

function getSelect() {
  return document.querySelector(".goog-te-combo");
}

function trigger(lang) {
  const select = getSelect();

  if (!select) return false;

  if (select.value !== lang) {
    select.value = lang;
  }

  select.dispatchEvent(
    new Event("change", {
      bubbles: true,
    }),
  );

  return true;
}

function waitForGoogle(lang) {
  return new Promise((resolve) => {
    let retry = 0;
    const MAX_RETRY = 30;

    const timer = setInterval(() => {
      const success = trigger(lang);

      if (success || retry >= MAX_RETRY) {
        clearInterval(timer);
        resolve(success);
      }

      retry++;
    }, 200);
  });
}

async function change(lang) {
  save(lang);

  await waitForGoogle(lang);
}

async function restore() {
  const lang = current();

  if (lang === DEFAULT_LANGUAGE) return;

  await waitForGoogle(lang);
}

const translate = {
  change,
  restore,
  current,
};

export default translate;
