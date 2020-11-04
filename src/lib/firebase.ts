import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurement
}

const initialFirebase = firebase.initializeApp(firebaseConfig);
const db = initialFirebase.firestore();

export default db;