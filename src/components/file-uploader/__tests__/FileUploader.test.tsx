import { render, fireEvent, waitFor } from "@testing-library/react";
import FileUploader from "../FileUploader";
import "@testing-library/jest-dom";

describe("<FileUploader />", () => {
  const mockSetBbox = jest.fn();
  const mockSetGeoJsonData = jest.fn();

  it("should render correctly", () => {
    const { getByText } = render(
      <FileUploader setBbox={mockSetBbox} setGeoJsonData={mockSetGeoJsonData} />
    );
    expect(getByText("Drag and drop file here")).toBeInTheDocument();
  });
});
