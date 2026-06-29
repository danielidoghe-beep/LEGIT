import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
  query,
  where
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

const ADMIN_EMAIL = "danielidoghe@gmail.com";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Access denied.");
    window.location.href = "dashboard.html";
    return;
  }

  document.getElementById("adminEmail").textContent =
    "Welcome, " + user.email;

  const snapshot = await getDocs(collection(db, "users"));
  document.getElementById("totalUsers").textContent = snapshot.size;

  const usersList = document.getElementById("usersList");
  const depositRequestsList = document.getElementById("depositRequestsList");
  const template = document.getElementById("userCardTemplate");
depositRequestsList.innerHTML = "";

const depositSnapshot = await getDocs(collection(db, "depositRequests"));

depositSnapshot.forEach((requestDoc) => {
  const request = requestDoc.data();

  if (request.status === "Approved") {
    return;
  }

  depositRequestsList.innerHTML += `
    <div class="card">
      <h3>${request.email}</h3>
      <p>Amount: $${Number(request.amount).toFixed(2)}</p>
      <p>Status: ${request.status}</p>

      <button class="approveDepositBtn" data-id="${requestDoc.id}">
        ✅ Approve Deposit
      </button>
    </div>
  `;
});
  usersList.innerHTML = "";

  snapshot.forEach((userDoc) => {
    const data = userDoc.data();

    const card = template.content.cloneNode(true);

    card.querySelector(".userEmail").textContent = data.email;
    card.querySelector(".userBalance").textContent =
      "$" + Number(data.balance).toFixed(2);

    const input = card.querySelector(".balanceInput");
    const button = card.querySelector(".updateBalanceBtn");

    button.addEventListener("click", async () => {
      const newBalance = Number(input.value);

      if (isNaN(newBalance) || newBalance < 0) {
        alert("Please enter a valid balance.");
        return;
      }

      try {
        // Update the user's balance
        await updateDoc(doc(db, "users", userDoc.id), {
          balance: newBalance
        });

        // Save a transaction
        await addDoc(
          collection(db, "users", userDoc.id, "transactions"),
          {
            type: "Admin Credit",
            amount: newBalance,
            date: new Date().toLocaleDateString(),
            createdAt: serverTimestamp()
          }
        );

        // Update the balance on the page
        card.querySelector(".userBalance").textContent =
          "$" + newBalance.toFixed(2);

        input.value = "";

        alert("✅ Balance updated and transaction saved!");
      } catch (error) {
  console.error(error);
  console.error(error.stack);

  alert(
    "Error: " + error.message +
    "\n\nStack:\n" +
    error.stack
  );
}
    });

    usersList.appendChild(card);
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
