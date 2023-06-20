// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKmthVlPc_c9abWCHG-NOMzh1COaAYanw",
  authDomain: "ecommerce-img-3d3af.firebaseapp.com",
  projectId: "ecommerce-img-3d3af",
  storageBucket: "ecommerce-img-3d3af.appspot.com",
  messagingSenderId: "939482144381",
  appId: "1:939482144381:web:446410e8288b407a2f5b14",
  measurementId: "G-5DEV2RVDEQ",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp