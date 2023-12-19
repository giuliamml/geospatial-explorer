import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import moment from "moment";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { FeatureCollection } from "../../types/types";
import { ListGroup } from "react-bootstrap";

type PropTypes = {
  data: FeatureCollection;
};

const ResultsTable = ({ data }: PropTypes) => {
  const displayProperties: ColDef[] = [
    { headerName: "Id", field: "id" },
    { headerName: "Description", field: "description", filter: true },
    {
      headerName: "Date & Time",
      field: "datetime",
      valueFormatter: (params: ValueFormatterParams) =>
        formatDateTime(params.value),
    },
    {
      headerName: "Bounding Box",
      field: "bbox",
      tooltipField: "longText",
      valueFormatter: (params: ValueFormatterParams) =>
        formatBbox(params.value),
    },
    {
      headerName: "Cloud Coverage",
      field: "cloudCoverage",
      valueFormatter: (params: ValueFormatterParams) => `${params.value}%`,
    },
    // {
    //   headerName: "Spectral Bands",
    //   field: "spectralBands",
    //   cellRenderer: (params: ValueFormatterParams) =>
    //     renderSpectralBands(params.data.assets),
    //   tooltipField: "spectralBandsTooltip",
    // },
    // {
    //   headerName: "Thumbnail",
    //   field: "thumbnail",
    //   cellRenderer: "linkCellRenderer",
    // },
    // {
    //   headerName: "Metadata",
    //   field: "metadataLinks",
    //   cellRenderer: (params) => renderMetadataLinks(params.value),
    //   cellRenderer: "linkCellRenderer",
    // },
  ];

  const LinkCellRenderer = ({ value }) => {
    console.debug(value, "value");
    // Check if the value is an object and has a href property
    if (value && typeof value === "object" && value.href) {
      return (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {value.href}
        </a>
      );
    }

    // Handle other cases as needed
    return null;
  };

  const gridOptions = {
    // ... other grid options ...

    frameworkComponents: {
      linkCellRenderer: LinkCellRenderer,
    },

    // ... other grid options ...
  };

  const formatDateTime = (isoDateString: string) => {
    console.log("Received date string:", isoDateString);
    const date = moment(isoDateString);
    console.log("Parsed date:", date);
    return date.isValid()
      ? date.format("MMMM Do YYYY, h:mm:ss a")
      : "Invalid Date";
  };

  const formatBbox = (bboxArray: number[]) => {
    return bboxArray
      ? `SW: ${bboxArray[1]}, ${bboxArray[0]} - NE: ${bboxArray[3]}, ${bboxArray[2]}`
      : "Invalid Bbox";
  };

  const renderSpectralBands = (assets) => {
    // Logic to display spectral bands
  };

  // const renderThumbnail = (thumbnailObj) => {
  //   const { href } = thumbnailObj;
  //   return (
  //     <a href={href} target="_blank">
  //       <img src={href} style={{ width: "50px", height: "auto" }} />
  //     </a>
  //   );
  // };

  const rowData = data.features.map((feature) => ({
    id: feature.id,
    description: feature.description,
    datetime: feature.properties.datetime,
    bbox: feature.bbox,
    cloudCoverage: feature.properties["landsat:cloud_cover_land"],
    // spectralBands: feature.assets, // Assuming assets contain spectral bands
    // thumbnail: feature.assets.thumbnail,
    // metadataLinks: feature.assets["MTL.json"],
  }));

  return (
    <div
      className={"ag-theme-quartz-dark"}
      style={{ height: 400, width: "100%", textAlign: "left" }}
      aria-label="table"
    >
      <h2>Data results</h2>
      <AgGridReact
        aria-label="table"
        columnDefs={displayProperties}
        rowData={rowData}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={20}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default ResultsTable;
