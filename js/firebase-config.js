import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKg8urHiPqGTbe74YicBPdXTPT0oKGl_0",
    authDomain: "tannhat-cms.firebaseapp.com",
    projectId: "tannhat-cms",
    storageBucket: "tannhat-cms.appspot.com",
    messagingSenderId: "686221026312",
    appId: "1:686221026312:web:b324d6b1b5c6810eb39dbd",
    measurementId: "G-CV43Z2M3LQ"
};
// Khởi tạo ứng dụng Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Tạo reference tới Firebase Realtime Database
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
