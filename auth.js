// ============================================================
// AUTH.JS — មុខងារ Register / Login / Logout / Role check
// ត្រូវការ firebase-config.js ដំណើរការមុននេះ
// ============================================================

// ---------- REGISTER (Sign up) ----------
// role: "customer" ជា default; គ្មាន UI សម្រាប់ user ជ្រើសរើសខ្លួនឯងជា admin ទេ
// (admin ត្រូវបង្កើតដោយផ្ទាល់ក្នុង Firestore console ដើម្បីសុវត្ថិភាព)
function registerUser(name, email, password) {
  const errorBox = document.getElementById("auth-error");
  errorBox.textContent = "";

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).set({
        name: name,
        email: email,
        role: "customer",
        createdAt: new Date().toISOString()
      });
    })
    .then(() => {
      window.location.href = "customer.html";
    })
    .catch((error) => {
      errorBox.textContent = translateFirebaseError(error.code);
    });
}

// ---------- LOGIN ----------
function loginUser(email, password) {
  const errorBox = document.getElementById("auth-error");
  errorBox.textContent = "";

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).get();
    })
    .then((doc) => {
      if (!doc.exists) {
        errorBox.textContent = "រកមិនឃើញទិន្នន័យ user នេះក្នុង Firestore ទេ។";
        return;
      }
      const role = doc.data().role;
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "customer.html";
      }
    })
    .catch((error) => {
      errorBox.textContent = translateFirebaseError(error.code);
    });
}

// ---------- LOGOUT ----------
function logoutUser() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// ---------- ROLE GUARD ----------
// ហៅមុខងារនេះនៅលើ admin.html / customer.html ដើម្បីការពារទំព័រ
// requiredRole: "admin" ឬ "customer"
function guardPage(requiredRole) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    db.collection("users").doc(user.uid).get().then((doc) => {
      if (!doc.exists || doc.data().role !== requiredRole) {
        alert("អ្នកមិនមានសិទ្ធិចូលទំព័រនេះទេ។");
        window.location.href = "login.html";
        return;
      }
      const nameEl = document.getElementById("user-name");
      if (nameEl) nameEl.textContent = doc.data().name || user.email;
    });
  });
}

// ---------- ERROR MESSAGES (Khmer) ----------
function translateFirebaseError(code) {
  const messages = {
    "auth/email-already-in-use": "អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។",
    "auth/invalid-email": "អ៊ីមែលមិនត្រឹមត្រូវ។",
    "auth/weak-password": "លេខសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។",
    "auth/user-not-found": "រកមិនឃើញគណនីនេះទេ។",
    "auth/wrong-password": "លេខសម្ងាត់មិនត្រឹមត្រូវ។",
    "auth/invalid-credential": "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។"
  };
  return messages[code] || ("មានបញ្ហា៖ " + code);
}
