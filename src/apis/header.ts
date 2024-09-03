import { deleteData, getData } from ".";

//header 버튼 클릭시, 오늘 쓰는 날짜인지 체크
export const getCheckDate = async (challengeId: number, date: string) => {
  const response = await getData(`/challenge/information/${challengeId}/${date}
  `);
  return response.data;
};

interface checkTodayProps {
  todayTemplateStatus: boolean;
}

//header 버튼 클릭시, 오늘 얘가 썼는지 안썼는지 체크
export const getCheckToday = async (organization: string, challengeId: number) => {
  const response =
    await getData<checkTodayProps>(`/user/challenge/${organization}/${challengeId}/daily-reflection
  `);
  return response.data;
};

export const dateCheck = async (navigate: (arg0: string) => void, today: string) => {
  try {
    await getCheckDate(Number(localStorage.getItem("challengeId") || "1"), today);
    try {
      const res = await getCheckToday(
        localStorage.getItem("organization") || "",
        Number(localStorage.getItem("challengeId") || "1")
      );
      if (res.todayTemplateStatus) {
        alert("오늘은 이미 글을 작성하셨어요!");
      } else {
        navigate(`/writing/${today}`);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    new Error("shit");
  }
};

export const deleteLogout = async (refreshToken: string) => {
  const response = await deleteData("/auth/logout", {
    headers: {
      refresh: refreshToken,
    },
  });
  return response.data;
};
