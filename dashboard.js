import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOvI9756xstsLc7ZMou75pSDd5ZZU0cfg",
  authDomain: "legit-ee0ae.firebaseapp.com",
  projectId: "legit-ee0ae",
  storageBucket: "legit-ee0ae.firebasestorage.app",
  messagingSenderId: "389932442399",
  appId: "1:389932442399:web:dc97b02a8e197deca0862a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show the logged-in user's email
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userEmail").textContent =
      "Welcome, " + user.email;
  } else {
    window.location.href = "index.html";
  }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
