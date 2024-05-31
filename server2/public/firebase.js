

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import bcrypt from 'bcrypt';

const firebaseConfig = {
  apiKey: "AIzaSyAUg5d6VpoJSJ1OWe_zYg8ER3kRBpQ9nFQ",
  authDomain: "chatroom-421223.firebaseapp.com",
  projectId: "chatroom-421223",
  storageBucket: "chatroom-421223",
  messagingSenderId: "199486896569",
  appId: "1:199486896569:web:d04a624b5c4a469ddbde68",
  measurementId: "G-MMD690D7KC"
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

