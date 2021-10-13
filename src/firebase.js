import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBawqZ9RyHC1gus7yuGBUp2feDAF6E7k6s",
  authDomain: "what-do-you-no-f5478.firebaseapp.com",
  databaseURL: "https://what-do-you-no-f5478-default-rtdb.firebaseio.com",
  projectId: "what-do-you-no-f5478",
  storageBucket: "what-do-you-no-f5478.appspot.com",
  messagingSenderId: "766486158041",
  appId: "1:766486158041:web:a74ed18a0dcd5cc0493cc8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;