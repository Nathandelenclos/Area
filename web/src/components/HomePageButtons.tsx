import React from "react";

/**
 * Props for the HomePageButton component.
 * @interface HomePageButtonProps
 */
type HomePageButtonProps = {
  /**
   * The content of the button.
   */
  Content: string;
};

/**
 * HomePageButton component displays the buttons on the home page.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <HomePageButton
 *   Content="Create Applet"
 * />
 *
 * @param {HomePageButtonProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
export default function HomePageButton({ Content }: HomePageButtonProps) {
  return (
    <div className="rounded-[10px] mt-5 py-10 px-8 bg-[#7A73E7] hover:bg-[#7A73E7CC] cursor-pointer basis-[80%] md:basis-[32%] sm:basis-[40%] mx-2 ">
      <p className="text-white font-semibold text-[23px] break-all">
        {Content}
      </p>
    </div>
  );
}
