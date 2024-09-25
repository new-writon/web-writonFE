import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAqlANweyIGV7Mwy1iGtgFk7P4SlrcR1Jg",
  authDomain: "writon-3b81a.firebaseapp.com",
  projectId: "writon-3b81a",
  storageBucket: "writon-3b81a.appspot.com",
  messagingSenderId: "807036353129",
  appId: "1:807036353129:web:e99fedeabf1e9d9455c0f8",
  measurementId: "G-YMXFQTCNNR",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

//토큰값 얻기
getToken(messaging, {
  vapidKey:
    "BEC7zsAOEMKJz2WH-4N7aq8AuFL5009elrTLnAb4nj37aT1w25d6ZY6uHu1i48vfKiEPO7s-u758Kqhs1cCWjMk",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
      alert("토큰: " + currentToken);
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);

  // ...
});
