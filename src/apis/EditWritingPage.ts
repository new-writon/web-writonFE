import { postWritingDataType } from "@/types";

import { putData } from ".";

//edit 글 수정
export const patchEditWritingSubmit = async (
  userTemplateId: number,
  templateContent: postWritingDataType[]
) => {
  const response = await putData("/template/root/update", {
    userTemplateId,
    templateContent,
  });
  return response.data;
};
