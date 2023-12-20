import { render, screen, fireEvent } from "@testing-library/react";
import RangeDatePicker from "../RangeDatePicker";

const mockHandleOnChange = jest.fn();

describe("<RangeDatePicker />", () => {
  it("should render the date picker component", () => {
    render(
      <RangeDatePicker
        handleOnChange={mockHandleOnChange}
        startDate={null}
        endDate={null}
      />
    );

    const datePicker = screen.getByRole("textbox");
    expect(datePicker).toBeInTheDocument();

    fireEvent.change(datePicker, { target: { value: "2023/12/17" } });

    expect(mockHandleOnChange).toHaveBeenCalledTimes(1);
  });
});
