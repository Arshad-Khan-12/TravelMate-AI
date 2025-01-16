// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6msY1zpxQjJuBm5bYAwL7tYqRqh5fGOo",
  authDomain: "travelmate-ai-334d0.firebaseapp.com",
  projectId: "travelmate-ai-334d0",
  storageBucket: "travelmate-ai-334d0.firebasestorage.app",
  messagingSenderId: "556016319411",
  appId: "1:556016319411:web:5f1043986608e52399e9c6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
