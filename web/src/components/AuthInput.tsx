import React from "react";

type AuthInputProps = {
  type?: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function AuthInput({
  type,
  placeholder,
  value,
  setValue,
}: AuthInputProps) {
  return (
    <input
      className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
      type={type ?? "text"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
