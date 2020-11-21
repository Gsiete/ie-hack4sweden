import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmkNSAnwtZx9C5D8eZhC_-yR-yueV9tCM",
    authDomain: "internet-explorers-hack4sweden.firebaseapp.com",
    databaseURL: "https://internet-explorers-hack4sweden.firebaseio.com",
    projectId: "internet-explorers-hack4sweden",
    storageBucket: "internet-explorers-hack4sweden.appspot.com",
    messagingSenderId: "817884916484",
    appId: "1:817884916484:web:d0f72e8c2450a4ff5d3e51"
};

const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();

export default app;
