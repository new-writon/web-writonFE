// pwa 일때만 푸시알림 허용 창 띄우기
export const isPWA = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};
