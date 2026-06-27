"use client";

import { useEffect } from "react";
import translate from "./translate";

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";

let initialized = false;

export default function TranslateProvider({ children }) {
  useEffect(() => {
    if (initialized) {
      translate.restore();
      return;
    }

    initialized = true;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,bn,ar,zh-CN,fr,de,el,hi,id,it,ja,ko,ms,pt,ru,es,th,ur,vi",
          autoDisplay: false,
        },
        ELEMENT_ID,
      );

      setTimeout(() => {
        translate.restore();
      }, 800);
    };

    const existingScript = document.getElementById(SCRIPT_ID);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    } else {
      if (window.google?.translate) {
        translate.restore();
      }
    }
  }, []);

  return (
    <>
      {children}

      <div
        id={ELEMENT_ID}
        style={{
          display: "none",
        }}
      />
    </>
  );
}
