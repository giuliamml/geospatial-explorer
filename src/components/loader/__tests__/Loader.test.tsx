import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("<Loader />", () => {
  it("should render the loader with a spinner element", () => {
    render(<Loader />);

    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
  });
});
