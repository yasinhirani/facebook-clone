// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBA2sG1ZC7w780hENXEQ_hB2f4Fdpxgswo",
  authDomain: "facebook-clone-8eef2.firebaseapp.com",
  projectId: "facebook-clone-8eef2",
  storageBucket: "facebook-clone-8eef2.appspot.com",
  messagingSenderId: "756115711296",
  appId: "1:756115711296:web:06d3eac447f9a0662a06a5",
  measurementId: "G-7M3Y8KBXYW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { storage };
