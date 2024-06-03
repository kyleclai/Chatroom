import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import bcrypt from 'bcrypt';

const firebaseConfig = {
  apiKey: "AIzaSyDna4KthRd3VQwbofp7zpaGQhYsDDrlO5Y",
  authDomain: "chatroom-css360.firebaseapp.com",
  projectId: "chatroom-css360",
  storageBucket: "chatroom-css360.appspot.com",
  messagingSenderId: "422918245255",
  appId: "1:422918245255:web:b8be0a398436288a006122",
  measurementId: "G-ESL8YMMNX3",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function writeUserData(userId, name, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      password: hashedPassword
    });
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

function readUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("User data:", snapshot.val());
        
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}

// Call the function with sample values
export { writeUserData, readUserData };

writeUserData("123123","alice","a@gmail.com","123");
  readUserData("123123");