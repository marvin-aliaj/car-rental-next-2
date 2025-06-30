import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
// import customMarkerIcon from "leaflet/dist/images/marker-icon.png";
// import customMarkerIcon from "public/marker.svg"

function Map() {
  const customMarker = L.icon({
    iconUrl: "/marker.svg",
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <MapContainer
      className="z-0 h-100"
      center={[41.3281957, 19.4487999]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[41.3281957, 19.4487999]} icon={customMarker}>
        <Popup>
          <p>This is our location in Durr&euml;s</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
