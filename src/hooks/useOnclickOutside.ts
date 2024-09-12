//모달 창 외부 클릭시, 모달 닫기

import { useEffect } from "react";

const useOnclickOutside = (refs: React.RefObject<HTMLElement>[], handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isOutside = true;

      refs.forEach((ref) => {
        if (ref.current && ref.current.contains(event.target as Node)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        handler();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
};

export default useOnclickOutside;
