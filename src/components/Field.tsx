import React, { FC } from "react";
import { useAutoCompleteContext } from "../autoCompleteContext";

interface FieldProps {
  type?: string;
  value: string;
  isDisablad?: boolean;
  placeholder?: string;
}

export const Field: FC<FieldProps> = ({
  type,
  value,
  isDisablad,
  placeholder,
}) => {
  const { handleOnChange, handleOnFocus } = useAutoCompleteContext();

  return (
    <input
      type={type}
      value={value}
      disabled={isDisablad}
      placeholder={placeholder}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
    />
  );
};
