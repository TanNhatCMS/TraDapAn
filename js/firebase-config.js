import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvQpsWaAwN41oOYCWeHmJsNQChIVQt1jU",
    authDomain: "tan-nhat-cms-project.firebaseapp.com",
    databaseURL: "https://tan-nhat-cms-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tan-nhat-cms-project",
    storageBucket: "tan-nhat-cms-project.appspot.com",
    messagingSenderId: "35607135709",
    appId: "1:35607135709:web:65d7fc8d75b3e6fd9a6234",
    measurementId: "G-K0S12LQ4E7"
};
// Khởi tạo ứng dụng Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Tạo reference tới Firebase Realtime Database
const db = getDatabase(firebaseApp);

export { firebaseApp, db };
