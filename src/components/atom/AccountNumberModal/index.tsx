import { ChangeEvent, useState } from "react";

import { useSetRecoilState } from "recoil";

import { patchAccountNumberData } from "@/apis/MyPage";
import { accountNumberState } from "@/recoil/atoms";
import { accountNumberProps } from "@/types";

import { MainSemiTitle } from "../MainSemiTitle";
import { Input } from "../input";

import { AccountNumberBox, Container, EditButton } from "./style";

export const AccountNumberModal = () => {
  const setAccountNumberModal = useSetRecoilState(accountNumberState);

  const [accountNumberData, setAccountNumberData] = useState<accountNumberProps>({
    accountNumber: "",
    bank: "",
  });

  const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const validCharacters = value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g) || [];

    if (value.length < 16) {
      setAccountNumberData({ ...accountNumberData, bank: validCharacters.join("") }); // 추출된 문자를 다시 합침
    }
  };

  const handleAccountNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const validCharacters = value.match(/^[\d-]+$/g) || [];

    if (value.length < 30) {
      setAccountNumberData({ ...accountNumberData, accountNumber: validCharacters.join("") }); // 추출된 문자를 다시 합침
    }
  };

  const AccountEditComplete = async () => {
    try {
      await patchAccountNumberData(accountNumberData);
      setAccountNumberModal(false);
      document.body.style.overflowY = "scroll";
    } catch {
      new Error("shit");
    }
  };

  return (
    <Container>
      <AccountNumberBox>
        <MainSemiTitle font={1.5}>계좌번호 입력</MainSemiTitle>
        <div className="semititle">
          챌린지 종료 후 보증금을 받을 계좌번호를 정확히 입력해주세요.
        </div>
        <div className="bank field">
          <div className="title">은행</div>
          <Input
            type="text"
            value={accountNumberData.bank}
            onChange={handleBankChange}
            placeholder="은행명을 입력해주세요. (ex. 00은행)"
          />
        </div>
        <div className="accountNumber field">
          <div className="title">계좌번호</div>
          <Input
            type="text"
            value={accountNumberData.accountNumber}
            onChange={handleAccountNumberChange}
            placeholder="계좌번호를 입력해주세요."
          />
        </div>
        <EditButton>
          <div
            className="editCloseBtn"
            onClick={() => {
              setAccountNumberModal(false);
              document.body.style.overflowY = "scroll";
            }}
          >
            취소
          </div>
          <div
            className="editCompleteBtn"
            onClick={AccountEditComplete}
          >
            완료
          </div>
        </EditButton>
      </AccountNumberBox>
    </Container>
  );
};
