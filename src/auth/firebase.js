// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjgW5_8-_Si0eYP7Wp3PiVA6BjkhUKzVM",
  authDomain: "broxworx-pick-em.firebaseapp.com",
  projectId: "broxworx-pick-em",
  storageBucket: "broxworx-pick-em.appspot.com",
  messagingSenderId: "1089123766753",
  appId: "1:1089123766753:web:5575bff9883ca6b87642a0",
  measurementId: "G-BYE6N6X4SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);