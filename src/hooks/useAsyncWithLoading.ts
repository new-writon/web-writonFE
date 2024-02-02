import { useSetRecoilState } from "recoil";

import { loadingState } from "@/recoil/atoms";

const useAsyncWithLoading = () => {
  const setIsLoading = useSetRecoilState(loadingState);

  const executeAsyncTask = async <T>(callback: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      return await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return executeAsyncTask;
};

export default useAsyncWithLoading;
