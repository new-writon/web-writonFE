import { RecoilRoot } from "recoil";

import Router from "./router";
import { GlobalStyle } from "./style/global";
const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
};

export default App;
