import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDmpmKSZQ6r-5A0b7wFKSWDktBIcAh2VcA",
  authDomain: "circle-222.firebaseapp.com",
  databaseURL: "https://circle-222.firebaseio.com",
  projectId: "circle-222",
  storageBucket: "circle-222.appspot.com",
  messagingSenderId: "1042152066554",
  appId: "1:1042152066554:web:9e6931d5f1c558b1e66843",
  measurementId: "G-BQGS8EJY6Z"
};

const fireApp = Firebase.initializeApp(firebaseConfig);
export const db = fireApp.database();
export const auth = fireApp.auth();
export const storage = fireApp.storage();
