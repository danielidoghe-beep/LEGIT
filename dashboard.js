import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy
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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("userEmail").textContent =
    "Welcome, " + user.email;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    document.getElementById("balance").textContent =
      "$" + Number(data.balance).toFixed(2);
  }

  const transactionList = document.getElementById("transactionList");
  transactionList.innerHTML = "";

  const q = query(
    collection(db, "users", user.uid, "transactions"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    transactionList.innerHTML = "<p>No transactions yet.</p>";
  } else {
    snapshot.forEach((transaction) => {
      const data = transaction.data();

      transactionList.innerHTML += `
        <div class="card">
          <strong>${data.type}</strong><br>
          Amount: $${Number(data.amount).toFixed(2)}<br>
          ${data.date}
        </div>
      `;
    });
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
