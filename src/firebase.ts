import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase configuration for Beamy project
const firebaseConfig = {
  apiKey: "AIzaSyDYPr58BAWsz-wmM8KIJMFfZz5WFbOZsUs",
  authDomain: "beamy-715e3.firebaseapp.com",
  databaseURL: "https://beamy-715e3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beamy-715e3",
  storageBucket: "beamy-715e3.firebasestorage.app",
  messagingSenderId: "737912245382",
  appId: "1:737912245382:web:8f06eebf6452a5c423d507",
  measurementId: "G-YDRERL16VV"
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Export Firebase Auth instance for use across the app
export const auth = getAuth(firebaseApp) 