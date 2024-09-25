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

// Firebase 초기화
initializeApp(firebaseConfig);

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  const messaging = getMessaging();

  // 알림 권한 요청
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");

      // 권한이 허용된 후에 토큰을 가져옴
      getToken(messaging, {
        vapidKey:
          "BEC7zsAOEMKJz2WH-4N7aq8AuFL5009elrTLnAb4nj37aT1w25d6ZY6uHu1i48vfKiEPO7s-u758Kqhs1cCWjMk",
      })
        .then((currentToken) => {
          if (currentToken) {
            // 토큰을 서버로 전송하거나 UI 업데이트
            console.log("토큰: ", currentToken);
            alert("토큰: " + currentToken);
          } else {
            console.log("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
          }
        })
        .catch((err) => {
          alert(err);
          console.log("토큰을 가져오는 중 에러 발생: ", err);
        });
    } else {
      console.log("알림 권한이 거부되었습니다.");
      alert(`${permission}알림 권한을 허용해야 푸시 알림을 받을 수 있습니다.`);
    }
  });

  // 포그라운드에서 메시지를 수신
  onMessage(messaging, (payload) => {
    console.log("메시지를 수신했습니다: ", payload);
    // 여기서 수신한 메시지를 처리
  });
}
