// 🔹 FIREBASE IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 APNA FIREBASE CONFIG DALNA
const firebaseConfig = {
  apiKey: "AIzaSyC7DB_tKXjqLAjTgYueaHzWTwIkwc9CJaw",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "sdxnodes-46445",
  appId: "1:724836578713:web:c5055eaefb8d68dac28f08"
};

// 🔹 INITIALIZE APP & AUTH
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 SIGNUP
export function signupUser(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  createUserWithEmailAndPassword(auth,email,pass)
    .then(()=>{alert("Signup Success!"); document.getElementById("auth").classList.remove("active"); document.getElementById("home").classList.add("active");})
    .catch(e=>alert("Signup Error: "+e.message));
}

// 🔹 LOGIN
export function loginUser(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  signInWithEmailAndPassword(auth,email,pass)
    .then(()=>{alert("Login Success!"); document.getElementById("auth").classList.remove("active"); document.getElementById("home").classList.add("active");})
    .catch(e=>alert("Login Error: "+e.message));
}

// 🔹 GOOGLE LOGIN
export function googleLogin(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(()=>{alert("Google Login Success!"); document.getElementById("auth").classList.remove("active"); document.getElementById("home").classList.add("active");})
    .catch(e=>alert("Google Login Error: "+e.message));
}
