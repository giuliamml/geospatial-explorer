import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GroupCellRendererParams,
  ITooltipParams,
  ValueFormatterParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Feature, FeatureCollection } from "../../types/types";
import ModalElement from "../modal-element/ModalElement";
import formatBbox from "../../utils/formatBbox";
import { formatDate, formatTime } from "../../utils/formatDateTime";

type PropTypes = {
  data: FeatureCollection;
};

const InfoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 50 50"
      fill="grey"
    >
      <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
  );
};

const ResultsTable = ({ data }: PropTypes) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Feature | null>(null);

  const makeCloudCoverageStyle = (params: ValueFormatterParams) => {
    if (params.value < 50) {
      return { color: "green" };
    } else if (params.value >= 50 && params.value <= 80) {
      return { color: "orange" };
    } else {
      return { color: "red" };
    }
  };

  const handleButtonClick = (params: GroupCellRendererParams) => {
    setIsModalOpen(true);
    setModalData(params.value);
  };
  const displayProperties: ColDef[] = [
    {
      headerName: "Id",
      field: "id",
      tooltipField: "id",
    },
    {
      headerName: "Description",
      field: "description",
      filter: true,
      tooltipField: "description",
    },
    {
      headerName: "Date",
      field: "datetime",
      valueFormatter: (params: ValueFormatterParams) =>
        formatDate(params.value),
    },
    {
      headerName: "Time",
      field: "datetime",
      valueFormatter: (params: ValueFormatterParams) =>
        formatTime(params.value),
    },
    {
      headerName: "Bounding Box",
      field: "bbox",
      valueFormatter: (params: ValueFormatterParams) =>
        formatBbox(params.value),
      tooltipValueGetter: (params: ITooltipParams) => formatBbox(params.value),
    },
    {
      headerName: "Cloud Coverage",
      field: "cloudCoverage",
      valueFormatter: (params: ValueFormatterParams) => `${params.value}%`,
      tooltipValueGetter: (params: ITooltipParams) => `${params.value}%`,
      cellStyle: makeCloudCoverageStyle,
    },
    {
      headerName: "",
      field: "feature",
      cellRenderer: (params: GroupCellRendererParams) => (
        <button
          style={{ border: "none", backgroundColor: "transparent" }}
          onClick={() => handleButtonClick(params)}
        >
          <InfoIcon />
        </button>
      ),
    },
  ];

  const rowData = data.features.map((feature) => ({
    id: feature.id,
    description: feature.description,
    datetime: feature.properties.datetime,
    bbox: feature.bbox,
    cloudCoverage: feature.properties["landsat:cloud_cover_land"],
    thumbnail: feature.assets.thumbnail.href,
    feature: feature,
  }));

  return (
    <>
      <div className={"ag-theme-quartz"} aria-label="table">
        <AgGridReact
          aria-label="table"
          columnDefs={displayProperties}
          rowData={rowData}
          domLayout="autoHeight"
        />
      </div>
      {isModalOpen && (
        <ModalElement
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={modalData as Feature}
        />
      )}
    </>
  );
};

export default ResultsTable;
