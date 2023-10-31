import {initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2P9jXy0pxUXHQJy-sEPdObLj8kT6R0jU",
    authDomain: "cocktail-quiz-1ab15.firebaseapp.com",
    projectId: "cocktail-quiz-1ab15",
    storageBucket: "cocktail-quiz-1ab15.appspot.com",
    messagingSenderId: "530162522969",
    appId: "1:530162522969:web:0f71562c9eab8aa97b4a48",
    measurementId: "G-FKSG1FVGC2"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;