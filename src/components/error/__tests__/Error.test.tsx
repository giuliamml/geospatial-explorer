import { render, screen } from "@testing-library/react";
import Error from "../Error";
import { useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("<Error />", () => {
  it("should display an error message when an error occurs", () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { description: "404 error" },
    });

    render(<Error />);

    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
  });

  it("should not display a message when no error occurrs", () => {
    (useLocation as jest.Mock).mockReturnValue({ state: {} });

    render(<Error />);

    expect(screen.queryByText(/The following error occurred:/i)).toBeNull();
  });
});
