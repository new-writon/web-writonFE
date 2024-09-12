import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCalendarRecordCurrent,
  getChallengeCurrent,
  getRetrospectCurrent,
} from "@/apis/mainPage";
import { organizationChallengeDataType } from "@/types/axios";
import { getBasicQuestion, getSpecialQuestion, postwritingSubmit } from "@/apis/WritingPage";
import { postEditWritingDataType, postWritingDataType } from "@/types";
import { patchEditWritingSubmit } from "@/apis/EditWritingPage";
import {
  getAgoraChat,
  getAgoraData,
  getCommunityContentData,
  getCommunityDate,
  getCommunityFirstComponent,
  getMyCommunityStory,
  postAgoraComment,
  postAgoraTopic,
} from "@/apis/CommunityPage";
import { format } from "date-fns";
import {
  getComment,
  getTemplete,
  postCommentWrite,
  postLike,
  postLikeDelete,
} from "@/apis/DetailPage";
import { getMyPageData } from "@/apis/MyPage";

// 현재 내 챌린지 상태 정보 가져오기
export const useGetChallengeCurrent = ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  return useQuery({
    queryKey: ["getChallengeCurrent", organization, challengeId],
    queryFn: () => getChallengeCurrent({ organization, challengeId }),
    select: (data) => data.data,
  });
};

// 현재 내 챌린지 달력 정보 가져오기
export const useGetCalendarRecordCurrent = ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  return useQuery({
    queryKey: ["getCalendarRecordCurrent", organization, challengeId],
    queryFn: () => getCalendarRecordCurrent({ organization, challengeId }),
    select: (data) => data.data.calendarData,
  });
};

// 현재 내 챌린지 회고글 가져오기
export const useGetRetrospectCurrent = ({
  organization,
  challengeId,
}: organizationChallengeDataType) => {
  return useQuery({
    queryKey: ["getRetrospectCurrent", organization, challengeId],
    queryFn: () => getRetrospectCurrent({ organization, challengeId }),
    select: (data) => data.data.templateData.reverse(),
  });
};

// basic question 가져오기
export const useGetBasicQuestion = (challengeId: string) => {
  return useQuery({
    queryKey: ["getBasicQuestion ", challengeId],
    queryFn: () => getBasicQuestion(challengeId),
    select: (data) => data,
  });
};

// basic question 가져오기
export const useGetSpecialQuestion = (challengeId: string) => {
  return useQuery({
    queryKey: ["getSpecialQuestion ", challengeId],
    queryFn: () => getSpecialQuestion(challengeId),
    select: (data) => data,
  });
};

// submit 글쓰기
export const useSubmitWrite = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({
      organization,
      challengeId,
      date,
      postWritingData,
    }: {
      organization: string;
      challengeId: string;
      date: string;
      postWritingData: postWritingDataType[];
    }) => {
      await postwritingSubmit(organization, challengeId, date, postWritingData);
    },
    onSuccess: (_, { organization, challengeId }) => {
      // 각각의 데이터 쿼리 캐시 무효화하여 새로 가져오기
      queryClient.invalidateQueries({
        queryKey: ["getChallengeCurrent", organization, challengeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCalendarRecordCurrent", organization, challengeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRetrospectCurrent", organization, challengeId],
      });
    },
    onError: (error) => {
      console.error("Error submitting writing:", error);
    },
  });

  return { mutate };
};

// submit 글쓰기 수정

export const useSubmitEditWrite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      organization,
      challengeId,
      postEditWritingData,
    }: {
      organization: string;
      challengeId: string;
      postEditWritingData: postEditWritingDataType[];
    }) => {
      // 데이터 배열에서 필요한 필드만 추출
      const postSubmitArray = postEditWritingData.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ question, category, userTemplateId, ...rest }) => rest
      );

      // 수정된 글 제출 API 호출
      await patchEditWritingSubmit(postEditWritingData[0].userTemplateId, postSubmitArray);

      return { organization, challengeId };
    },
    onSuccess: (_, { organization, challengeId }) => {
      // 각각의 데이터 쿼리 캐시 무효화하여 새로 가져오기
      queryClient.invalidateQueries({
        queryKey: ["getChallengeCurrent", organization, challengeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCalendarRecordCurrent", organization, challengeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getRetrospectCurrent", organization, challengeId],
      });
    },
    onError: (error) => {
      console.log(error);
      console.log("글수정 실패");
      console.error("Error submitting edit writing:", error);
    },
  });
};

// challenge를 누가 몇명 쓰고 이런거 가져오기
export const useGetCommunityChallengeStats = (challengeId: string) => {
  return useQuery({
    queryKey: ["getCommunityChallengeStats ", challengeId],
    queryFn: () => getCommunityFirstComponent(challengeId),
    select: (data) => data,
  });
};

// (나중에) 커뮤니티 스토리 내 정보 가져오기
export const useGetCommunityMyStory = (challengeId: string) => {
  return useQuery({
    queryKey: ["getCommunityMyStory ", challengeId],
    queryFn: () => getMyCommunityStory(challengeId),
    select: (data) => data,
  });
};

// 커뮤니티 활성화 날짜 배열
export const useCommunityDates = (challengeId: string) => {
  return useQuery({
    queryKey: ["communityDates", challengeId],
    queryFn: () => getCommunityDate(challengeId),
    select: (data) => data.map((item: string) => format(item, "yyyy-MM-dd")),
  });
};

// 커뮤니티 (날짜별) 컨텐츠 데이터 가져오기
export const useCommunityContentData = ({
  organization,
  challengeId,
  selectedDate,
}: {
  organization: string;
  challengeId: string;
  selectedDate: string | Date;
}) => {
  return useQuery({
    queryKey: ["communityContentData", organization, challengeId, selectedDate],
    queryFn: async () => {
      return await getCommunityContentData(organization, challengeId, selectedDate);
    },
    select: (data) => ({
      challengeCompleteCount: data.challengeCompleteCount,
      templateData: Array.from(data.templateData || []).reverse(), // reverse 처리된 templateData 반환
    }),
    enabled: selectedDate !== "", // selectedDate가 null이 아닐 때만 실행
  });
};

// 모바일 화면일 떄 디테일 페이지 데이터 가져오기 params로 들어오는 id 값
export const useGetDetailData = ({
  organization,
  templateId,
  type,
  width,
}: {
  organization: string;
  templateId: number;
  type: string;
  width: number;
}) => {
  return useQuery({
    queryKey: ["getDetailData", organization, templateId, type],
    queryFn: () => getTemplete(organization, templateId, type === "my" ? false : true),
    enabled: width <= 530, // 모바일일 때만 쿼리를 활성화
  });
};

// 댓글 가져오기
export const useGetComments = ({
  organization,
  templateId,
}: {
  organization: string;
  templateId: number;
}) => {
  return useQuery({
    queryKey: ["getComments", organization, templateId],
    queryFn: () => getComment(templateId, organization),
  });
};

// 내 정보 가져오기
export const useGetMyInfo = (organization: string) => {
  return useQuery({
    queryKey: ["getMyInfo", organization],
    queryFn: () => getMyPageData(organization),
  });
};

// 좋아요 추가 훅
export const useLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userTemplateId,
      organization,
    }: {
      userTemplateId: number;
      organization: string;
    }) => {
      return await postLike(userTemplateId, organization);
    },
    onSuccess: () => {
      // 성공적으로 좋아요를 추가한 후 필요한 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ["communityContentData"] });
    },
  });
};

// 좋아요 삭제 훅
export const useUnlikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userTemplateId,
      organization,
    }: {
      userTemplateId: number;
      organization: string;
    }) => {
      return await postLikeDelete(userTemplateId, organization);
    },
    onSuccess: () => {
      // 성공적으로 좋아요를 삭제한 후 필요한 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ["communityContentData"] });
    },
  });
};

// 커뮤니티 아고라 데이터 가져오기
export const useGetAgoraData = ({
  challengeId,
  selectedDate,
}: {
  challengeId: string;
  selectedDate: string | Date;
}) => {
  return useQuery({
    queryKey: ["getAgoraData", challengeId, selectedDate],
    queryFn: async () => {
      return await getAgoraData(challengeId, selectedDate);
    },
    enabled: selectedDate !== "", // selectedDate가 null이 아닐 때만 실행
  });
};

// 커뮤니티 아고라 상세 채팅내용 가져오기
export const useGetAgoraChatData = (chatId: number) => {
  return useQuery({
    queryKey: ["getAgoraChatData", chatId],
    queryFn: async () => {
      return await getAgoraChat(chatId);
    },
  });
};

// 아고라 글 등록 훅
export const usePostAgoraTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      organization,
      challengeId,
      text,
    }: {
      organization: string;
      challengeId: number;
      text: string;
    }) => {
      return await postAgoraTopic(organization, challengeId, text);
    },
    onSuccess: () => {
      // 성공적으로 좋아요를 삭제한 후 필요한 쿼리 재요청
      queryClient.invalidateQueries({ queryKey: ["getAgoraData"] });
    },
  });
};

// 아고라 글 코멘트 등록
export const usePostAgoraComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      organization,
      smallTalkId,
      text,
    }: {
      organization: string;
      smallTalkId: number;
      text: string;
    }) => {
      return await postAgoraComment(organization, smallTalkId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAgoraData"] });
      queryClient.invalidateQueries({ queryKey: ["getAgoraChatData"] });
    },
  });
};

// 디테일 페이지 댓글 달기
export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userTemplateId,
      organization,
      content,
      commentGroup,
    }: {
      userTemplateId: number;
      organization: string;
      content: string;
      commentGroup: number;
    }) => {
      return await postCommentWrite(userTemplateId, organization, content, commentGroup);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityContentData"] });
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
    },
  });
};
