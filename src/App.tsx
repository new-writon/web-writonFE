import { useEffect } from "react";

import { RecoilRoot } from "recoil";

import Router from "./router";
import { GlobalStyle } from "./style/global";
const App = () => {
  useEffect(() => {
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
