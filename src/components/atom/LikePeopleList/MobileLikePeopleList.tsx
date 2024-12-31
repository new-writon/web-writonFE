import styled from "styled-components";
import profile from "@/assets/communityPage/profile.png";

const MobileLikePeopleList = ({
  likePeopleData,
}: {
  likePeopleData: { nickname: string; userProfileImage: string }[];
}) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Title>
        <Number>{likePeopleData.length}</Number>
        <Text>명이 함께 응원해요</Text>
      </Title>
      <div className="line"></div>
      <List>
        {likePeopleData.map((item, index) => (
          <Item key={index}>
            <ItemImage src={item.userProfileImage ?? profile} />
            <ItemText>{item.nickname}</ItemText>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default MobileLikePeopleList;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  padding: 16px 21px;
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  .line {
    height: 1px;
    flex-shrink: 0;
    background: var(--Gray-30, #edeef1);
    margin: 10px 0;
  }
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%; /* 14.4px */
  padding: 6px 8px;
`;

const Number = styled.span`
  color: var(--Main-50, #6272ff);
`;

const Text = styled.span`
  color: var(--Gray-60, #94989f);
`;

const List = styled.div`
  width: 100%;
  max-height: 320px;
  overflow-y: scroll;
`;

const Item = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px;
`;

const ItemImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const ItemText = styled.span`
  color: var(--Gray-80, #464c52);
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 22.4px */
`;
