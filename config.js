import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJFVH03Tis-IoIoRn8Dhj1_3ISxSu4T4I",
  authDomain: "gest-cmd.firebaseapp.com",
  projectId: "gest-cmd",
  storageBucket: "gest-cmd.appspot.com",
  messagingSenderId: "619677313045",
  appId: "1:619677313045:web:3f8de4792fee77a307061c",
  measurementId: "G-HZ46PV0602"

};

if (!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
}

export { firebase};