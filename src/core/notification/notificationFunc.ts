import { registerServiceWorker } from "@/utils/notification";
import { getToken } from "firebase/messaging";
import { messaging } from "./settingFCM";
import { postDeviceToken } from "@/apis/notification";

export async function handleAllowNotification() {
  const status = await Notification.requestPermission(); //여기서 에러 처리 해야함.
  // 나중에 차단되었을 때 다시 허용할 수 있도록 설정해야함 (그건 다시 까는 법밖에 없음))
  // 에러 처리 유연하게 대체하기 alret창 안뜨게 끔) 종류 3개 - granted, denied, default
  if (status === "denied") {
    return "denied";
  } else if (status === "granted") {
    try {
      // 서비스 워커 등록 완료를 기다림
      await registerServiceWorker();
      const token = await retryGetDeviceToken(3); // 최대 3번까지 재시도
      await postDeviceToken(token);
      return "granted";
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return "default";
  }
}

// getDeviceToken 재시도 로직 추가
async function retryGetDeviceToken(retries: number): Promise<string> {
  try {
    return await getDeviceToken();
  } catch (error) {
    if (retries === 0) {
      console.error("최대 재시도 횟수 초과:", error);
      throw error;
    } else {
      console.warn(`getDeviceToken 재시도 중... 남은 횟수: ${retries}`);
      return retryGetDeviceToken(retries - 1);
    }
  }
}

async function getDeviceToken(): Promise<string> {
  // 권한이 허용된 후에 토큰을 가져옴
  const token = await getToken(messaging, {
    vapidKey:
      "BEC7zsAOEMKJz2WH-4N7aq8AuFL5009elrTLnAb4nj37aT1w25d6ZY6uHu1i48vfKiEPO7s-u758Kqhs1cCWjMk",
  });

  // console.log("토큰: ", token);
  // alert("토큰: " + token);
  return token;
}
