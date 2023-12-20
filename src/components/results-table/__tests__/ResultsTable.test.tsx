import { render, screen, waitFor } from "@testing-library/react";
import ResultsTable from "../ResultsTable";

jest.mock("moment", () => {
  return function (timestamp: string) {
    return {
      format: function (formatString: string) {
        if (
          timestamp === "2023-12-17T12:00:00Z" &&
          formatString === "MMMM Do YYYY, h:mm:ss a"
        ) {
          return "December 17th 2023, 12:00:00 pm";
        }
        return timestamp;
      },
      isValid: function () {
        return true;
      },
    };
  };
});

describe("<ResultsTable />", () => {
  it("should render the table component with selected response data", async () => {
    const mockData = {
      features: [
        {
          description:
            "Landsat Collection 2 Level-1 Top of Atmosphere Radiance Product",
          properties: {
            datetime: "2023-12-17T12:00:00Z",
            "landsat:cloud_cover_land": 20,
          },
          bbox: [-100.0, 40.0, -105.0, 45.0],
          assets: {
            thumbnail: {
              href: "",
            },
          },
        },
      ],
    };
    // @ts-expect-error - for testing purposes not all properties were added to the mock
    render(<ResultsTable data={mockData} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Landsat Collection 2 Level-1 Top of Atmosphere Radiance Product"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("20%")).toBeInTheDocument();
      expect(
        screen.getByText("SW: 40, -100 - NE: 45, -105")
      ).toBeInTheDocument();
    });
  });
});
