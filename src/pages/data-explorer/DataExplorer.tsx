import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../../components/form/Form";
import FileUploader from "../../components/file-uploader/FileUploader";
import MapWithDraw from "../../components/map-with-draw/MapWithDraw";
import useFetchData from "../../hooks/useFetchData";
import { useRef, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import styles from "./DataExplorer.module.css";
import { Feature, FeatureCollection } from "../../types/types";
import { AxiosError } from "axios";
import TabsSection from "../../components/tabs-section/TabsSection";

const DataExplorer = () => {
  // INITIAL STATE
  const [bbox, setBbox] = useState<Feature["bbox"]>();
  const [dates, setDates] = useState<[string, string] | [null, null]>([
    null,
    null,
  ]);
  const [geoJsonData, setGeoJsonData] = useState<
    FeatureCollection | GeoJSON.GeoJsonObject | null
  >(null);

  //HANDLE  NAVIGATION
  const navigate = useNavigate();

  // INITIALIZE HOOK INSTANCE
  const { data, loading, error, fetchData } = useFetchData();

  const resultsTableRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!bbox || !dates[0] || !dates[1]) {
      alert(
        "Bounding box and date range are required. Please select both before proceeding."
      );
      return;
    }

    fetchData("https://landsatlook.usgs.gov/stac-server/search", {
      bbox: bbox && bbox.toString(),
      datetime: `${dates[0]}/${dates[1]}`,
      collections: ["landsat-c2l1", "landsat-c2l2-st"],
    });
  };

  if (loading) {
    <Loader />;
  }
  if (error) {
    navigate("/error", {
      state: { description: (error as AxiosError).message },
    });
  }

  return (
    <Container className={styles.container}>
      <Row>
        <h1>Search geospatial data</h1>
      </Row>
      <Row>
        <FileUploader setBbox={setBbox} setGeoJsonData={setGeoJsonData} />
      </Row>
      <Row>
        <Col sm={9} className={styles.conlumn}>
          <MapWithDraw
            setBbox={setBbox}
            geoJsonData={geoJsonData}
            bbox={bbox as Feature["bbox"]}
          />
        </Col>
        <Col sm={3} className={styles.conlumn}>
          <Form
            handleClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleClick(event)
            }
            setDates={setDates}
            dates={dates}
          />
          {loading && <Loader />}
        </Col>
      </Row>

      <div ref={resultsTableRef} className={styles.tabsSection}>
        {data && <TabsSection data={data} />}
      </div>
    </Container>
  );
};

export default DataExplorer;
