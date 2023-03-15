import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDl0_Fn6kMX-xz70uTi15e3Bqk2vtVLou8',
  authDomain: 'netflix-build-78671.firebaseapp.com',
  projectId: 'netflix-build-78671',
  storageBucket: 'netflix-build-78671.appspot.com',
  messagingSenderId: '404287569982',
  appId: '1:404287569982:web:047778d167e9eda996116f',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
