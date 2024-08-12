import { useSetRecoilState } from "recoil";

import { errorState } from "@/recoil/atoms";

import { Container } from "./style";

export const ErrorModal = ({ errorMessage }: { errorMessage: string }) => {
  const setErrorMessage = useSetRecoilState(errorState);

  return (
    <Container>
      <div className="modal-content">
        <p>{errorMessage}</p>
        <button onClick={() => setErrorMessage("")}>Close</button>
      </div>
    </Container>
  );
};
