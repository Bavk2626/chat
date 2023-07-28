
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC95TiJL32il71nsiLQok-EoS-NugLF6FU",
  authDomain: "chat-66a6b.firebaseapp.com",
  projectId: "chat-66a6b",
  storageBucket: "chat-66a6b.appspot.com",
  messagingSenderId: "416404547412",
  appId: "1:416404547412:web:a6ce2cca6d0d9e60664ac1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);