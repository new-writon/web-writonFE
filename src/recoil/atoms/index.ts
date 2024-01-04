import { atom } from "recoil";

//common
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

//register
export const agreeTextState = atom({
  key: "agreeTextState",
  default: -1,
});
