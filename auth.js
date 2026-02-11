// 🔹 FIREBASE IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 APNA FIREBASE CONFIG DALNA
const firebaseConfig = {
  apiKey: "AIzaSyC7DB_tKXjqLAjTgYueaHzWTwIkwc9CJaw",
  authDomain: "sdxnodes-46445.firebaseapp.com",
  projectId: "sdxnodes-46445",
  appId: "1:724836578713:web:c5055eaefb8d68dac28f08"
};

// 🔹 INITIALIZE APP & AUTH
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 SIGNUP
export function signupUser(){
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("emailSign").value;
  const pass = document.getElementById("passSign").value;

  if(!name || !username || !email || !pass){ alert("All fields required!"); return; }

  createUserWithEmailAndPassword(auth,email,pass)
    .then(()=>{
      alert("Signup Success!");
      document.getElementById("auth").classList.remove("active");
      document.getElementById("home").classList.add("active");
    })
    .catch(e=>alert("Signup Error: "+e.message));
}

// 🔹 LOGIN
export function loginUser(){
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("passLogin").value;

  if(!email || !pass){ alert("All fields required!"); return; }

  signInWithEmailAndPassword(auth,email,pass)
    .then(()=>{
      alert("Login Success!");
      document.getElementById("auth").classList.remove("active");
      document.getElementById("home").classList.add("active");
    })
    .catch(e=>alert("Login Error: "+e.message));
}

// 🔹 DISCORD LOGIN (placeholder)
export function discordLogin(){
  alert("Discord login placeholder! Replace with OAuth URL.");
  // yahan tu Discord OAuth link dal sakta hai
}
