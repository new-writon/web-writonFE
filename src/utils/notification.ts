export async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");
    console.log("Service Worker 등록 성공:", registration);
  } catch (error) {
    console.log("Service Worker 등록 실패:", error);
  }
}
