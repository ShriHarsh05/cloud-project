import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDGXroTX_wRHaseIklkH7zyFZspvjNX_rE",
    authDomain: "loginapp-ab54b.firebaseapp.com",
    projectId: "loginapp-ab54b",
    storageBucket: "loginapp-ab54b.firebasestorage.app",
    messagingSenderId: "956777406508",
    appId: "1:956777406508:web:0280636212c3896f20f189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Handle user state and load data
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId); // Ensure collection name is "users"
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log("User Data:", userData);
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email; // Fixed ID selector
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching id");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
});

// Logout function
const logoutButton = document.getElementById('logout'); // Ensure logout button exists in HTML
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
            .then(() => {
                window.location.href = "login_register";
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    });
} else {
    console.warn("Logout button not found in HTML.");
}