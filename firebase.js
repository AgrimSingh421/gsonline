import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM6PsCZqM0x4KDxR-4ltHrRaLDxdUGcyg",
  authDomain: "gs-online-f8bf6.firebaseapp.com",
  projectId: "gs-online-f8bf6",
  storageBucket: "gs-online-f8bf6.appspot.com",
  messagingSenderId: "876551895794",
  appId: "1:876551895794:web:d933cf52c005de2b8c2e6b",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, storage, serverTimestamp };
