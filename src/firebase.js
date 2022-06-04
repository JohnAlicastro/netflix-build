// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

/* FIREBASE CONFIGURATION KEY */
const firebaseConfig = {
  apiKey: 'AIzaSyDl0_Fn6kMX-xz70uTi15e3Bqk2vtVLou8',
  authDomain: 'netflix-build-78671.firebaseapp.com',
  projectId: 'netflix-build-78671',
  storageBucket: 'netflix-build-78671.appspot.com',
  messagingSenderId: '404287569982',
  appId: '1:404287569982:web:047778d167e9eda996116f',
};

/* INITIALIZE FIREBASE APPLICATION */
/* commented our lines below are from older version of firebase */

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
const auth = getAuth(firebaseApp);

/* EXPORTS */
export { auth };
export default db;
