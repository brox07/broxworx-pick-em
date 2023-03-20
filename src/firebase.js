import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCjgW5_8-_Si0eYP7Wp3PiVA6BjkhUKzVM',
  authDomain: 'broxworx-pick-em.firebaseapp.com',
  projectId: 'broxworx-pick-em',
  storageBucket: 'broxworx-pick-em.appspot.com',
  messagingSenderId: '1089123766753',
  appId: '1:1089123766753:web:5575bff9883ca6b87642a0',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export const auth = firebase.auth();

export default database;
