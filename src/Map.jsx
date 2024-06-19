import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
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
      <TileLayer
        attribution='© <a href="https://stadiamaps.com/">Stadia Maps</>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a > contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position}>
        <Popup>{position}</Popup>
      </Marker>
      <MarkerClusterGroup>
        <GeoJSON
          data={geojsonData}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.popupContent);
          }}
        />
      </MarkerClusterGroup>
    </MapContainer>
  );
};
{
}

export default Map;
