import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import "./Map.css";

const Map = ({ geojsonData }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const crd = position.coords;
          console.log();
          const lat = crd.latitude;
          const lng = crd.longitude;
          setPosition([lat, lng]);
        });
      }
    };
    getLocation();
  }, []);
  if (!position) {
    return <div className="loader"></div>;
  }
  console.log(position);
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{position}</Popup>
      </Marker>
      <MarkerClusterGroup>
        <GeoJSON data={geojsonData} />
      </MarkerClusterGroup>
    </MapContainer>
  );
};
{
}

export default Map;
