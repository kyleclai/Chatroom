import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import _ from 'lodash';

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

async function writeUserData(chatroom, name, timestamp, message) {
  try {
    set(ref(db, 'chatroom/' + chatroom), {
      name: name,
      timestamp: timestamp,
      message: message
    });
  } catch (error) {
    console.error("Error writing data:", error);
  }
}

async function readUserData(chatroom) {
  const userRef = ref(db, 'chatroom/' + chatroom);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("User data:", snapshot.val());
        return snapshot;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
    
}

function getParametersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    username: urlParams.get('username') || 'Anonymous',
    chatroom: urlParams.get('chatroom') || 'DefaultChatroom'
  };
}

const { username, chatroom } = getParametersFromURL();

function sendMessage2() {
  var messageInput = document.getElementById('messageInput');
  var message = messageInput.value.trim();
  if (message !== '') {
    var timestamp = new Date().toISOString();
    displayMessage(username, message, timestamp);
    // username +timestamp or somethin
    messageInput.value = '';
    writeUserData(chatroom, username, timestamp, message);
  }
}

 async function displayMessage(sender, message, timestamp) {
    console.log("here maybe?")
    let data =  await readUserData("").val();
    console.log(data);
    console.log("do i get a console")
      

      var messagesContainer = document.getElementById('messages');
      var messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<span class="sender">${sender}:</span> ${message} <span class="timestamp"> - ${getCurrentTime(timestamp)}</span>`;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function getCurrentTime(timestamp) {
  var now = new Date(timestamp);
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var timeString = `${hours}:${minutes} ${ampm}`;
  return timeString;
}

// Attach functions to the window object
window.sendMessage2 = sendMessage2;
window.displayMessage = displayMessage;
window.getCurrentTime = getCurrentTime;