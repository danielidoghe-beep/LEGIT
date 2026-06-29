import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

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
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  currentUser = user;
});

document.getElementById("submitDepositBtn").addEventListener("click", async () => {

  const amount = Number(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    await addDoc(collection(db, "depositRequests"), {
      userId: currentUser.uid,
      email: currentUser.email,
      amount: amount,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    alert("✅ Deposit request submitted successfully!");

    document.getElementById("amount").value = "";

  } catch (error) {
    alert("Error: " + error.message);
  }

});
