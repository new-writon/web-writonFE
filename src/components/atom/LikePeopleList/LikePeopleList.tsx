import styled from "styled-components";
import profile from "@/assets/communityPage/profile.png";

const LikePeopleList = ({
  likePeopleData,
}: {
  likePeopleData: { nickname: string; userProfileImage: string }[];
}) => {
  return (
    <Container>
      <Title>
        <Number>{likePeopleData.length}</Number>
        <Text>명이 함께 응원해요</Text>
      </Title>
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

export default LikePeopleList;

const Container = styled.div`
  width: 100%;
  min-width: 200px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #fff;
  /* Dropshadow/popup */
  box-shadow: 0px 16px 50px 0px rgba(33, 33, 33, 0.25);
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 120%; /* 14.4px */
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
