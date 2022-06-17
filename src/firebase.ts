import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8luP980mD0i1crITuVd0AcaR1OvyYSJI',
  authDomain: 'hmbtob-b093b.firebaseapp.com',
  projectId: 'hmbtob-b093b',
  storageBucket: 'hmbtob-b093b.appspot.com',
  messagingSenderId: '172733158451',
  appId: '1:172733158451:web:8c672fecc7d97696c0ff46',
  measurementId: 'G-VT17LVMGL4'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, firebaseApp, provider };
