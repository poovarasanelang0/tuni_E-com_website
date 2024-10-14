// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider,RecaptchaVerifier } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9WZnlm6mgSpvACbJDVVDRoTb4B757_FA67",
  authDomain: "tunitest-e022d.firebaseapp.com",
  projectId: "tunitest-e022d",
  storageBucket: "tunitest-e022d9.appspot.com",
  messagingSenderId: "413997151629",
  appId: "1:41399715162:web:b60bf8757a4d86c8161f63",
  measurementId: "G-0DF6XDNTNK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);


export { app, firestore ,auth,provider,storage};
