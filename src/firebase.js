
import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBu-Vl2FLnLriagS9p3df5tpsMihhanvps",
    authDomain: "phone-book-d496b.firebaseapp.com",
    projectId: "phone-book-d496b",
    storageBucket: "phone-book-d496b.appspot.com",
    messagingSenderId: "973791937686",
    appId: "1:973791937686:web:48d745fabd2f9fbc64eeb7"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDwrOVosf5McaJXyQC7NBfCHgxwxnPjsPM",
//     authDomain: "practical-work-e9fc4.firebaseapp.com",
//     databaseURL: "https://practical-work-e9fc4.firebaseio.com",
//     projectId: "practical-work-e9fc4",
//     storageBucket: "practical-work-e9fc4.appspot.com",
//     messagingSenderId: "381421793018",
//     appId: "1:381421793018:web:6da8d8f23f48cc78e8e343",
//     measurementId: "G-7T9JLM2RRV"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, { useFetchStreams: false });