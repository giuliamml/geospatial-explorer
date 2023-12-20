import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import L, { LatLngBounds, Layer, Map } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Feature, FeatureCollection } from "../../types/types";

type PropTypes = {
  setBbox: (bounds: number[]) => void;
  bbox: Feature["bbox"];
  geoJsonData?: FeatureCollection | GeoJSON.GeoJsonObject | null;
};

const MapWithDraw = ({ setBbox, bbox, geoJsonData }: PropTypes) => {
  const mapRef = useRef<Map | null>(null);
  const onCreated = (event: { layer: Layer }) => {
    const layerBounds = (event.layer as any).getBounds() as LatLngBounds;

    const bounds = [
      layerBounds.getSouthWest().lng,
      layerBounds.getSouthWest().lat,
      layerBounds.getNorthEast().lng,
      layerBounds.getNorthEast().lat,
    ];

    setBbox(bounds);
  };

  useEffect(() => {
    // Handle the geoJSON data
    if (mapRef.current && geoJsonData) {
      const map = mapRef.current;
      const geoJsonLayer = L.geoJSON(
        geoJsonData as unknown as GeoJSON.GeoJsonObject
      );
      geoJsonLayer.addTo(map);
      if (bbox) {
        console.log(bbox, "bbox");
        map.flyTo([bbox[1], bbox[0]], 4);
      }
    }
  }, [bbox, geoJsonData]);

  return (
    <MapContainer
      ref={mapRef}
      center={[51.505, -0.09]}
      zoom={2}
      style={{ height: "500px" }}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={["mt1", "mt2", "mt3"]}
      />
      <FeatureGroup>
        <EditControl
          position="topleft"
          onCreated={onCreated}
          draw={{
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            rectangle: true,
            polygon: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapWithDraw;
