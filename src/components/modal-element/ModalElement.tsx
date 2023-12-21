import Modal from "react-bootstrap/Modal";
import { Feature } from "../../types/types";
import formatBbox from "../../utils/formatBbox";
import { formatDate, formatTime } from "../../utils/formatDateTime";
import { MapContainer, Rectangle, TileLayer } from "react-leaflet";
import { LatLngBoundsExpression, LatLngTuple } from "leaflet";

type PropTypes = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  data: Feature;
};

const ExternalLinkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="black"
    >
      <path d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"></path>
    </svg>
  );
};

const ModalElement = ({ isModalOpen, setIsModalOpen, data }: PropTypes) => {
  const { description, properties, assets, bbox } = data;
  const { datetime } = properties;

  const handleClose = () => setIsModalOpen(false);

  const extractSpectralBands = (assets: Feature["assets"]) => {
    const spectralBandKeys = ["coastal", "blue", "green", "red"];

    return spectralBandKeys
      .filter((key) => key in assets)
      .map((key) => ({
        title: assets[key].title,
        href: assets[key].href,
        type: assets[key].type,
      }));
  };

  const isMetadataFile = (key: string) => {
    const filesExt = [".json", ".txt", ".xml"];
    return filesExt.some((ext) => key.toLowerCase().endsWith(ext));
  };

  const renderMetadataFiles = () => {
    return Object.keys(assets)
      .filter((key) => isMetadataFile(key))
      .map((key) => (
        <ul key={key}>
          <li>
            <a
              href={assets[key].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {assets[key].title || key}
            </a>
            <ExternalLinkIcon />
          </li>
        </ul>
      ));
  };

  const center: LatLngTuple = [
    (bbox[1] + bbox[3]) / 2,
    (bbox[0] + bbox[2]) / 2,
  ];

  const convertBboxToBounds = (bbox: number[]) => {
    if (bbox.length === 4) {
      const southWest: [number, number] = [bbox[1], bbox[0]];
      const northEast: [number, number] = [bbox[3], bbox[2]];

      return [southWest, northEast] as LatLngBoundsExpression;
    }
    throw new Error("Invalid bounding box data");
  };

  const bounds = convertBboxToBounds(bbox);

  const spectralBands = extractSpectralBands(assets);
  return (
    <>
      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <h3>Description</h3>
            {description}
          </div>
          <div>
            <h3>Date and Time</h3>
            {`${formatDate(datetime)} - ${formatTime(datetime)}`}
          </div>
          {spectralBands.length > 0 && (
            <div>
              <h3>Spectral Bands</h3>
              <ul>
                {extractSpectralBands(assets).map((band, index) => (
                  <li key={index}>
                    <a
                      href={band.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {band.title}
                    </a>
                    <ExternalLinkIcon />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3>Location</h3>
            <p>{formatBbox(bbox)}</p>
            <MapContainer center={center} zoom={6} style={{ height: "500px" }}>
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt1", "mt2", "mt3"]}
              />

              <Rectangle bounds={bounds} color="blue" />
            </MapContainer>
          </div>
          <div>
            <h3>Assets</h3>
            {renderMetadataFiles()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalElement;
