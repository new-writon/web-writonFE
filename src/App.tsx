import { useEffect } from "react";

import { RecoilRoot } from "recoil";

import Router from "./router";
import { GlobalStyle } from "./style/global";
const App = () => {
  const initialRenderingColor = async () => {
    if (localStorage.getItem("challengeId") === "1") {
      document.documentElement.style.setProperty("--purple-50", "red");
    }
  };

  useEffect(() => {
    initialRenderingColor();
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
};

export default App;
