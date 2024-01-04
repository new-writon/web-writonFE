import { IoMdClose } from "react-icons/io";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { AuthorizationTitle } from "@/components/atom/AuthorizationTitle";
import { agreeText } from "@/dummy/agreeText";
import { agreeTextState } from "@/recoil/atoms";
export const DetailAgree = () => {
  const [agreeTextMNum, setAgreeTextNum] = useRecoilState(agreeTextState);

  const CloseAgreeText = () => {
    setAgreeTextNum(-1);
    document.body.style.overflowY = "auto";
  };
  return (
    <Container>
      <AuthorizationTitle>
        <IoMdClose
          className="close"
          onClick={CloseAgreeText}
        />
        <p>이용약관(필수)</p>
      </AuthorizationTitle>
      <div className="title">{agreeText[agreeTextMNum].title}</div>
      <div className="content">
        <pre>{agreeText[agreeTextMNum].content}</pre>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 50px;
  width: 40vw;
  min-width: 350px;
  height: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
  .close {
    position: absolute;
    right: 30px;
    top: 0;
    bottom: 50%;
    margin: auto 0;
    transform: scale(1.5);
    cursor: pointer;
  }
  div:nth-child(1) {
    display: block;
  }
  p {
    font-size: 1.2rem;
  }
  .title {
    display: flex;
    justify-content: center;
  }

  .content {
    text-align: left;
    border: 1px solid #e2e4e7;
    box-sizing: border-box;
    padding: 18px 18px 200px;
    margin: 30px 10px;
    overflow-y: scroll;
    height: 100%;
  }
  pre {
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
    color: #272727;
  }
`;
