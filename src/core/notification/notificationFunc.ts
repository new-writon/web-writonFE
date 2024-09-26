import { registerServiceWorker } from "@/utils/notification";
import { getToken } from "firebase/messaging";
import { messaging } from "./settingFCM";

export async function handleAllowNotification() {
  await Notification.requestPermission(); //여기서 에러 처리 해야함.
  // 나중에 차단되었을 때 다시 허용할 수 있도록 설정해야함 (그건 다시 까는 법밖에 없음))
  // 에러 처리 유연하게 대체하기 alret창 안뜨게 끔)

  registerServiceWorker();

  try {
    await getDeviceToken();
  } catch (error) {
    console.error(error);
  }
}

async function getDeviceToken() {
  // 권한이 허용된 후에 토큰을 가져옴
  await getToken(messaging, {
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
      alert(`123${err}`); // 여기서 차단 에러 남.
      console.log("토큰을 가져오는 중 에러 발생: ", err);
    });
}
