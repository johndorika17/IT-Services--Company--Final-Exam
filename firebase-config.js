// ============================================================
// FIREBASE CONFIG — ដាក់ config ពី Firebase Console របស់អ្នកនៅទីនេះ
// (Project Settings > General > Your apps > SDK setup and configuration)
// ============================================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (compat SDKs are loaded in each HTML page via <script> tags)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
