import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
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

window.signup = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created successfully! Please log in.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered.");
          break;

        case "auth/invalid-email":
          alert("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          alert("Password must be at least 6 characters.");
          break;

        default:
          alert("Sign-up failed: " + error.message);
      }
    });
};
