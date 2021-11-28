import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHfvhg0up8CCkjm-1MuNbpFwGws1kKlBw",
  authDomain: "verito-tattoo.firebaseapp.com",
  projectId: "verito-tattoo",
  storageBucket: "verito-tattoo.appspot.com",
  messagingSenderId: "747128332524",
  appId: "1:747128332524:web:9a7db39ffc5356350945c9",
  measurementId: "G-DLW6VCHN17"
};
export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore();
export const fireStorage = getStorage();
