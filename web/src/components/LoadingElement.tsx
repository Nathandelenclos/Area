import React from "react";

/**
 * LoadingElement component displays a loading element.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoadingElement />
 *
 * @returns {JSX.Element} Rendered component.
 */
export default function LoadingElement() {
  return (
    <div className="flex items-center justify-center border-[#7A73E7] border-4 border-t-white rounded-[80px] w-[80px] h-[80px] animate-spin"></div>
  );
}
