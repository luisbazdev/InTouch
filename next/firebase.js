import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJwuRglZiu1R6WCcdUnn-JCjj6sDHrh_M",
  authDomain: "intouch-test-998d2.firebaseapp.com",
  projectId: "intouch-test-998d2",
  storageBucket: "intouch-test-998d2.appspot.com",
  messagingSenderId: "862365213148",
  appId: "1:862365213148:web:110d1aeb7a133e9ac9af19"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider()


