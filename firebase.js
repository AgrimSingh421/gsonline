import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8GWJfoEauO5Dpu7q-NOtCoUoOY0BnmTs",
  authDomain: "gs-online-e65fe.firebaseapp.com",
  projectId: "gs-online-e65fe",
  storageBucket: "gs-online-e65fe.appspot.com",
  messagingSenderId: "956529354820",
  appId: "1:956529354820:web:47d213ed07975471567411"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, storage, serverTimestamp };
