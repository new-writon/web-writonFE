// /* eslint-disable no-undef */
// // Import the Firebase scripts for messaging
// importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// // Your Firebase configuration object
// const config = {
//   apiKey: "AIzaSyAqlANweyIGV7Mwy1iGtgFk7P4SlrcR1Jg",
//   authDomain: "writon-3b81a.firebaseapp.com",
//   projectId: "writon-3b81a",
//   storageBucket: "writon-3b81a.appspot.com",
//   messagingSenderId: "807036353129",
//   appId: "1:807036353129:web:e99fedeabf1e9d9455c0f8",
//   measurementId: "G-YMXFQTCNNR",
// };
// // Initialize Firebase
// firebase.initializeApp(config);

// const messaging = firebase.messaging();
// console.log(messaging);

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    data: resultData.data,
  };

  e.waitUntil(
    console.log("들어와라들어와라들어와라"), // 여기서 alert 창이 들어가면 안된다!
    self.registration.showNotification(notificationTitle, notificationOptions),
    console.log("들어오냐고")
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data;
  event.waitUntil(self.clients.openWindow(urlToOpen));
});

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

//백그라운드 서비스워커 설정
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message ", payload);

//   const notificationTitle = payload.notification.title || "New Notification";
//   const notificationOptions = {
//     body: payload.notification.body || "You have a new message",
//     icon: "/firebase-logo.png", // 아이콘 경로 설정
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
