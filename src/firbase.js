// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPPn7n_WU3Gv8oCze9Br__T7V8cMqV9Z0",
  authDomain: "boutiqvids-75741.firebaseapp.com",
  projectId: "boutiqvids-75741",
  storageBucket: "boutiqvids-75741.firebasestorage.app",
  messagingSenderId: "325056569755",
  appId: "1:325056569755:web:e712539f53fff10d0f813e",
  measurementId: "G-HLFC5S1NNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;