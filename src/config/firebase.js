import * as firebase from "firebase";
import 'firebase/firestore' // make sure you add this for firestore
import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();
export const stockItemsRef = databaseRef.child("stockItems");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
