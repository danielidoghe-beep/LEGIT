import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
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

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
    switch (error.code) {
        case "auth/user-not-found":
            alert("This email is not registered. Please sign up first.");
            break;

        case "auth/wrong-password":
            alert("Incorrect password.");
            break;

        case "auth/invalid-email":
            alert("Please enter a valid email address.");
            break;

        case "auth/invalid-credential":
            alert("Invalid email or password.");
            break;

        case "auth/too-many-requests":
            alert("Too many failed attempts. Please try again later.");
            break;

        default:
            alert("Login failed: " + error.message);
    }
});
};
