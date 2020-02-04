import { initializeApp, app } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARl5S_Vlk89M5yD9dHOrmA3tNoX6rSq3M",
  authDomain: "vocabulary-d63e1.firebaseapp.com",
  databaseURL: "https://vocabulary-d63e1.firebaseio.com",
  projectId: "vocabulary-d63e1",
  storageBucket: "vocabulary-d63e1.appspot.com",
  messagingSenderId: "337176973382",
  appId: "1:337176973382:web:c29a085a30f50086a17a47"
};

initializeApp(firebaseConfig);

const firebaseApp = app();

export { firebaseApp };