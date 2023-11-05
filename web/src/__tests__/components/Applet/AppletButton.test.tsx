import React from "react";
import { it, describe, expect } from "@jest/globals";
import AppletButton from "@src/components/Applet/AppletButton"; // Adjust the import path as necessary
import { AppContextType } from "@src/context/AppContextProvider"; // Adjust the import path as necessary
import { UserObject, UserObjectDto } from "@src/objects/UserObject";
import { renderWithAppContext } from "@src/context/TestContext";
import { log } from "console";

const providerValues: AppContextType = {
  language: "en",
  appName: "AppName",
  translate: jest.fn((...keys: string[]) => keys.join(" ")),
  setLanguage: jest.fn(),
  user: new UserObject({} as UserObjectDto),
  setUser: jest.fn(),
};

const title = "Button title";
const color = "#000000";
const onClick = jest.fn();

describe("AppletButton Component", () => {
  it("Renders with the correct title", () => {
    // Rendering the component with the mock context
    const { getByText } = renderWithAppContext(
      <AppletButton title={title} color={color} onClick={onClick} />,
      { providerValues },
    );
    // Checking if the component renders correctly
    expect(getByText(title)).toBeTruthy();
  });

  it("Renders with the correct color", () => {
    const { getByText } = renderWithAppContext(
      <AppletButton title={title} color={color} onClick={onClick} />,
      { providerValues },
    );

    const element = getByText(title);
    const computedStyle = getComputedStyle(element);
    expect(computedStyle.backgroundColor).toBe(color);
  });
});
