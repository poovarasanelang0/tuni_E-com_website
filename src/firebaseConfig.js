
import { initializeApp } from "firebase/app";
import { getFirestore,  } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyChX3kArsSX1e4m3-UddO_BGU9N-2ff4Vg",
  authDomain: "tuni-c0211.firebaseapp.com",
  projectId: "tuni-c0211",
  storageBucket: "tuni-c0211.appspot.com",
  messagingSenderId: "682471459218",
  appId: "1:682471459218:web:e774ac18d06698ce02994b",
  measurementId: "G-VNYLHT93PJ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }; 
