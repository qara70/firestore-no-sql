import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore();
