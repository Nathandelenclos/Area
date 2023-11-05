import React from "react";

/**
 * Props for the AuthInput component.
 * @interface AuthInputProps
 */
type AuthInputProps = {
  /**
   * The type of the input.
   */
  type?: string;
  /**
   * The placeholder text of the input.
   */
  placeholder: string;
  /**
   * The value of the input.
   */
  value: string;
  /**
   * The setter function to be executed when the input value changes.
   */
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * AuthInput component displays the input for the login and register pages.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <AuthInput
 *   type="password"
 *   placeholder="Password"
 *   value={password}
 *   setValue={setPassword}
 * />
 *
 * @param {AuthInputProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
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
