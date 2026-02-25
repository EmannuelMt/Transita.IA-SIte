// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA8CCv943Q_rpi47LBv6-S-woYnolFbcLM",
  authDomain: "transitaai-b4d4f.firebaseapp.com",
  databaseURL: "https://transitaai-b4d4f-default-rtdb.firebaseio.com",
  projectId: "transitaai-b4d4f",
  storageBucket: "transitaai-b4d4f.firebasestorage.app",
  messagingSenderId: "409048408677",
  appId: "1:409048408677:web:43e31bacdb5fa2901e9c8c",
  measurementId: "G-JES8FJNL41"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
// Realtime Database
export const db = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;