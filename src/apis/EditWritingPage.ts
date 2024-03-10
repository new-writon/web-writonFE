import { postWritingDataType } from "@/types";

import { putData } from ".";

//edit 글 수정
export const patchEditWritingSubmit = async (
  userTemplateId: number,
  templateContent: postWritingDataType[]
) => {
  const response = await putData("/user/my-posting", {
    userTemplateId,
    templateContent,
  });
  return response.data;
};
