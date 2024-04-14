import { useEffect } from "react";

import { RecoilRoot } from "recoil";

import Router from "./router";
import { GlobalStyle } from "./style/global";
const App = () => {
  const initialRenderingColor = async () => {
    if (localStorage.getItem("organization") === "렛츠인턴") {
      document.documentElement.style.setProperty("--Main-0", "#f8f8ff");
      document.documentElement.style.setProperty("--Main-10", "#f0efff");
      document.documentElement.style.setProperty("--Main-20", "#cfcdff");
      document.documentElement.style.setProperty("--Main-30", "#aeabff");
      document.documentElement.style.setProperty("--Main-40", "#8e89ff");
      document.documentElement.style.setProperty("--Main-50", "#6a63f5");
      document.documentElement.style.setProperty("--Main-60", "#524dd4");
      document.documentElement.style.setProperty("--Main-70", "#3e39b2");
      document.documentElement.style.setProperty("--Main-80", "#2d2890");
      document.documentElement.style.setProperty("--Main-90", "#1e1a6e");
      document.documentElement.style.setProperty("--Main-100", "#120f4c");
      document.documentElement.style.setProperty("--ProgressBar-first", "#d5abff");
      document.documentElement.style.setProperty("--ProgressBar-second", "#6a63f5");
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
