import { render } from "@testing-library/react";
import {
  ApplicationContext,
  AppContextType,
} from "@src/context/AppContextProvider"; // Adjust the import path as necessary
import { BrowserRouter } from "react-router-dom";
import fs from "fs";

// Mocking necessary imports
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Icon</div>,
}));
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

// Helper function to render the component with the necessary context
export const renderWithAppContext = (
  ui: JSX.Element,
  { providerValues }: { providerValues: AppContextType },
) => {
  const style = document.createElement("style");
  style.innerHTML = fs.readFileSync("src/__tests__/index.css", "utf8");
  document.head.appendChild(style);
  return render(
    <BrowserRouter>
      <ApplicationContext.Provider value={providerValues}>
        {ui}
      </ApplicationContext.Provider>
    </BrowserRouter>,
  );
};
