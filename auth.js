import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC7DB_tKXjqLAjTgYueaHzWTwIkwc9CJaw",
  authDomain: "sdxnodes-46445.firebaseapp.com",
  projectId: "sdxnodes-46445",
  appId: "1:724836578713:web:c5055eaefb8d68dac28f08"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
export function signupUser(){
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("emailSign").value;
  const pass = document.getElementById("passSign").value;
  if(!name || !username || !email || !pass){ alert("All fields required!"); return; }

  createUserWithEmailAndPassword(auth,email,pass)
    .then(res=>{
      alert("Signup Success!");
      showUserInfo({displayName: username});
    })
    .catch(e=>alert("Signup Error: "+e.message));
}

// Login
export function loginUser(){
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("passLogin").value;
  if(!email || !pass){ alert("All fields required!"); return; }

  signInWithEmailAndPassword(auth,email,pass)
    .then(res=>{
      alert("Login Success!");
      showUserInfo({displayName: email.split("@")[0]});
    })
    .catch(e=>alert("Login Error: "+e.message));
}

// Discord login placeholder
export function discordLogin(){
  alert("Discord login placeholder! Replace with OAuth.");
  showUserInfo({displayName: "DiscordUser", photoURL: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png"});
}

// Show user info in navbar and unlock pages
function showUserInfo(user){
  document.getElementById("auth").classList.remove("active");
  document.querySelectorAll(".page").forEach(p=>p.classList.add("active")); // unlock all pages
  document.getElementById("hamburger").style.display="block";
  document.getElementById("userProfile").style.display="flex";
  document.getElementById("userName").innerText=user.displayName || "User";
  if(user.photoURL) document.getElementById("userAvatar").src=user.photoURL;
}

// Logout
export function logoutUser(){
  signOut(auth).then(()=>{
    location.reload();
  });
}
