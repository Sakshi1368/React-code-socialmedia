// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCtEK2P8y2RXFHDap8cMOdRupMTtWy4j3w",

  authDomain: "react-course-81a54.firebaseapp.com",

  projectId: "react-course-81a54",

  storageBucket: "react-course-81a54.appspot.com",

  messagingSenderId: "152521424094",

  appId: "1:152521424094:web:24756c12241536603a964f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); //auth contains all the information of the user
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);