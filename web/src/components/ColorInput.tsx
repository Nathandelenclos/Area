import React, { useState } from "react";
import "../index.css";

const CustomColorInput = ({ title, onChange, value }: any) => {
  const [timeout, setTimeoutValue] = useState<any>(null);

  return (
    <div>
      <p className="font-medium text-sm text-left mb-2">{title}</p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="color-picker"
          onChange={(e) => {
            const newColor = e.target.value;
            if (timeout) clearTimeout(timeout);
            setTimeoutValue(
              setTimeout(() => {
                onChange(newColor);
              }, 500),
            );
          }}
          value={value}
        />
        <div className="w-52">
          <input
            className="custominputbox"
            type="text"
            value={value}
            placeholder="Code hexadécimal"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomColorInput;
