import { InputProps } from "@/types";

import { BasicInput, MyPageInput } from "./style";

export const Input = ({
  value,
  type,
  placeholder,
  onChange,
  onFocus,
  errorLine,
  onKeyDown,
}: InputProps) => {
  return (
    <div>
      <BasicInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        errorLine={errorLine}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export const myPageInput = ({
  value,
  type,
  placeholder,
  onChange,
  onFocus,
  errorLine,
  onKeyDown,
}: InputProps) => {
  return (
    <div>
      <MyPageInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        errorLine={errorLine}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
