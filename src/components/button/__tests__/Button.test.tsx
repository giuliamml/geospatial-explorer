import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

const mockHandleClick = jest.fn();

describe("<Button />", () => {
  test("renders the button with the correct label", () => {
    render(<Button label="Search" handleClick={mockHandleClick} />);

    const buttonElement = screen.getByRole("button", { name: /search/i });

    expect(buttonElement).toBeInTheDocument();
  });

  test("calls handleClick when clicked", () => {
    render(<Button label="Search" handleClick={mockHandleClick} />);

    const buttonElement = screen.getByRole("button", { name: /search/i });
    fireEvent.click(buttonElement);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
