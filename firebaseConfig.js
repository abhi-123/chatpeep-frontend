// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT4NMctGO_EOUKv7Sz2u7EA-AH7e553Q8",
  authDomain: "chatpeep.firebaseapp.com",
  projectId: "chatpeep",
  storageBucket: "chatpeep.appspot.com",
  messagingSenderId: "731485684122",
  appId: "1:731485684122:web:a82147d923142d6c463a23",
  measurementId: "G-E4NDE9N4SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('in firebase config');
//const analytics = getAnalytics(app);
export default app;
