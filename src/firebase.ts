import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMGH4DZuNILh0yO9VZe-NTDOkEtxljYvk',
  authDomain: 'interasiastock.firebaseapp.com',
  projectId: 'interasiastock',
  storageBucket: 'interasiastock.appspot.com',
  messagingSenderId: '95854230591',
  appId: '1:95854230591:web:2e8f7e00323bfe6afa8c8a',
  measurementId: 'G-K98DZ0SLWY'
}; //this is where your firebase app values you copied will go

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, firebaseApp, provider };
