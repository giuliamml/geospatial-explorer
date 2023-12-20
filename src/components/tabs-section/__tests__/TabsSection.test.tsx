import { render, fireEvent, screen } from "@testing-library/react";
import TabsSection from "../TabsSection";
import { FeatureCollection } from "../../../types/types";

jest.mock("../../results-table/ResultsTable", () => () => (
  <div>ResultsTable</div>
));
jest.mock("../../cloud-coverage-graph/CloudCoverageGraph", () => () => (
  <div>CloudCoverageGraph</div>
));

const mockData: FeatureCollection = {
  type: "FeatureCollection",
  stac_version: "1.0.0",
  stac_extensions: [],
  context: {
    limit: 50,
    matched: 23,
    returned: 23,
  },
  numberMatched: 23,
  numberReturned: 23,
  features: [
    {
      type: "Feature",
      stac_version: "1.0.0",
      stac_extensions: [
        "https://landsat.usgs.gov/stac/landsat-extension/v1.1.1/schema.json",
        "https://stac-extensions.github.io/view/v1.0.0/schema.json",
        "https://stac-extensions.github.io/projection/v1.0.0/schema.json",
        "https://stac-extensions.github.io/eo/v1.0.0/schema.json",
        "https://stac-extensions.github.io/alternate-assets/v1.1.0/schema.json",
        "https://stac-extensions.github.io/storage/v1.0.0/schema.json",
        "https://stac-extensions.github.io/classification/v1.0.0/schema.json",
      ],
      id: "LC08_L1GT_059220_20231201_20231209_02_T2",
      description:
        "Landsat Collection 2 Level-1 Top of Atmosphere Radiance Product",
      bbox: [
        -2.345304012692476, 50.61822298244484, 1.0243940068285398,
        52.765667314081064,
      ],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [0.30795492926855333, 52.765667314081064],
            [-2.345304012692476, 52.3088761249777],
            [-1.535319239203293, 50.61822298244484],
            [1.0243940068285398, 51.06692455794806],
            [0.30795492926855333, 52.765667314081064],
          ],
        ],
      },
      properties: {
        datetime: "2023-12-01T21:33:10.976578Z",
        "view:sun_azimuth": -55.04112471,
        "view:sun_elevation": -49.96901996,
        platform: "LANDSAT_8",
        instruments: ["OLI", "TIRS"],
        "view:off_nadir": 0,
        "landsat:cloud_cover_land": -1,
        "landsat:wrs_type": "2",
        "landsat:wrs_path": "059",
        "landsat:wrs_row": "220",
        "landsat:scene_id": "LC80592202023335LGN00",
        "landsat:collection_category": "T2",
        "landsat:collection_number": "02",
        "landsat:correction": "L1GT",
        "proj:epsg": 32630,
        "proj:shape": [8161, 8071],
        "proj:transform": [30, 0, 541485, 0, -30, 5852115],
        created: "2023-12-09T05:21:58.975Z",
        updated: "2023-12-09T05:21:58.975Z",
      },
      assets: {},
      links: [
        {
          rel: "self",
          href: "https://landsatlook.usgs.gov/stac-server/collections/landsat-c2l1/items/LC08_L1GT_059220_20231201_20231209_02_T2",
        },
        {
          rel: "parent",
          href: "https://landsatlook.usgs.gov/stac-server/collections/landsat-c2l1",
        },
        {
          rel: "collection",
          href: "https://landsatlook.usgs.gov/stac-server/collections/landsat-c2l1",
        },
        {
          rel: "root",
          href: "https://landsatlook.usgs.gov/stac-server/",
        },
      ],
      collection: "landsat-c2l1",
    },
  ],
  links: [
    {
      rel: "next",
      title: "Next page of Items",
      method: "GET",
      href: "https://landsatlook.usgs.gov/stac-server/search?datetime=2023-11-01T00%3A00%3A00%2B01%3A00%2F2023-12-02T00%3A00%3A00%2B01%3A00&collections[]=%5B%22landsat-c2l1%22%2C%22landsat-c2l2-st%22%5D&bbox=-0.09407043457031251%2C51.49292470924424%2C-0.06317138671875001%2C51.51397487398906&limit=50&next=2023-11-01T10%3A58%3A42.822848Z%2CLC09_L1TP_202024_20231101_20231101_02_T1%2Clandsat-c2l1",
    },
  ],
};

describe("<TabsSection />", () => {
  it("should render the tabs component with data", () => {
    render(<TabsSection data={mockData} />);

    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("shuold render <CloudCoverageGraph /> when Analytics tab is clicked", () => {
    render(<TabsSection data={mockData} />);

    const dataTab = screen.getByText("Data");
    fireEvent.click(dataTab);

    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });
});
