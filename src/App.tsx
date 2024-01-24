import { RecoilRoot } from "recoil";

import { ModalProvider } from "./components/Common/ModalProvider";
import Router from "./router";
import { GlobalStyle } from "./style/global";
const App = () => {
  return (
    <RecoilRoot>
      <ModalProvider />
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
};

export default App;
