import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpUtGhd9v_X7JQGJANpwrLyWRQi2lUga4",
  authDomain: "agama-it.firebaseapp.com",
  projectId: "agama-it",
  storageBucket: "agama-it.firebasestorage.app",
  messagingSenderId: "245157277982",
  appId: "1:245157277982:web:a447b3cc73527f25cc190f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
