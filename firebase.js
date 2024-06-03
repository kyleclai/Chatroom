import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import bcrypt from "bcrypt";

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
    await set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

async function readUserData(userId, password) {
  const userRef = ref(db, "users/" + userId);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const isMatch = await bcrypt.compare(password, userData.password); // Compare the plaintext password with the hashed password
      if (isMatch) {
        console.log("Passwords match!");
        return true;
      } else {
        console.log("Passwords do not match.");
        return false;
      }
    } else {
      console.log("No data available");
      return false;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return false;
  }
}

// Example usage
(async () => {
  const isValid = await readUserData("asd", "Asd");
  console.log("Password valid:", isValid);
})();

// Export the functions for use in other files
export { writeUserData, readUserData };
