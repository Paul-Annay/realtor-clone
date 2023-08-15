// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4SGfknhXpqk4DL4jTG6unlqwlWHQp7kQ",
    authDomain: "realtor-clone-react-b2070.firebaseapp.com",
    projectId: "realtor-clone-react-b2070",
    storageBucket: "realtor-clone-react-b2070.appspot.com",
    messagingSenderId: "696293824575",
    appId: "1:696293824575:web:4ae3b6189750d7def0808a",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
