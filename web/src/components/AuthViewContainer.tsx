import background from "@assets/vectorBackground.jpg";
import React from "react";

/**
 * Props for the AuthViewContainer component.
 * @interface AuthViewContainerProps
 */
type AuthViewContainerProps = {
  /**
   * The title of the container.
   */
  ContainerTitle: string;
  /**
   * The children of the container.
   */
  children: React.ReactNode;
};

/**
 * AuthViewContainer component displays the container for the login and register pages.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <AuthViewContainer
 *   ContainerTitle="Login"
 * >
 *   <AuthInput
 *     type="password"
 *     placeholder="Password"
 *     value={password}
 *     setValue={setPassword}
 *   />
 * </AuthViewContainer>
 *
 * @param {AuthViewContainerProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
export default function AuthViewContainer({
  ContainerTitle,
  children,
}: AuthViewContainerProps) {
  return (
    <div className="overflow-hidden w-full h-full flex items-center justify-center">
      <img
        src={background}
        alt="background"
        className="w-full h-screen object-cover z-0"
      />
      <div className="bg-white rounded-3xl absolute h-auto w-10/12 md:w-8/12 lg:w-3/12 z-10">
        <h1 className="text-4xl font-bold my-10 text-center">
          {ContainerTitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
