import { useState } from "react";
import styles from "./FileUploader.module.css";
import { Feature, FeatureCollection } from "../../types/types";

type PropTypes = {
  setBbox: (calculatedBbox: Feature["bbox"]) => void;
  setGeoJsonData: (geoJson: FeatureCollection) => void;
};

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="#9588deff"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
    />
    <path
      fillRule="evenodd"
      d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
    />
  </svg>
);

const FileUploader = ({ setBbox, setGeoJsonData }: PropTypes) => {
  const [fileDisplayText, setFileDisplayText] = useState({
    heading: "Drag and drop file here",
    subHeading: "Limit 10MB per file • JSON",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];

      if (file) {
        const fileName = file.name;

        console.log(fileName);

        const reader = new FileReader();

        reader.onload = (e) => {
          const text = e.target?.result;
          try {
            const geoJson = JSON.parse(text as string);
            if (geoJson && geoJson.type === "FeatureCollection") {
              setFileDisplayText({ heading: fileName, subHeading: "" });
              setGeoJsonData(geoJson);

              const calculatedBbox = calculateBbox(geoJson);
              console.log("Bbox coordinates:", calculatedBbox);
              setBbox(calculatedBbox);
            } else {
              alert("The uploaded JSON file it is not a GeoJSON.");
            }
          } catch (error) {
            alert(`Error parsing the file: ${error}`);
          }
        };

        reader.readAsText(file);
      }
    }
  };

  const calculateBbox = (geoJson: FeatureCollection) => {
    if (geoJson.bbox) {
      // GeoJSON files might already have bbox property
      return geoJson.bbox;
    }

    const lats: number[] = [],
      lngs: number[] = [];
    geoJson.features.forEach((feature: Feature) => {
      const coords = feature?.geometry?.coordinates[0];
      coords?.forEach(([coordLong, coordLat]) => {
        lngs.push(coordLong);
        lats.push(coordLat);
      });
    });

    return [
      Math.min(...lngs), // West
      Math.min(...lats), // South
      Math.max(...lngs), // East
      Math.max(...lats), // North
    ];
  };

  return (
    <>
      <p>Upload GeoJSON or draw a polygon on the map.</p>
      <div className={styles.fileUploaderWrapper}>
        <UploadIcon />
        <div className={styles.fileDropArea}>
          <div>
            <span className={styles.fileMessage}>
              {fileDisplayText.heading}
            </span>
            <span className={styles.fileMessage}>
              {fileDisplayText.subHeading}
            </span>
          </div>

          <span className={styles.chooseFileButton}>Browse files</span>
          <input
            className={styles.fileInput}
            type="file"
            aria-label="file-upload"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default FileUploader;
