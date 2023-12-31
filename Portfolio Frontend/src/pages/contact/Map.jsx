import React from "react";
import { useTheme } from "@mui/material/styles";
import { MapContainer, Circle, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Divider } from "@mui/material";

const Map = ({ coordinates, zoom }) => {
  const theme = useTheme();
  const position = coordinates;
  const fillBlueOptions = { fillColor: theme.palette.primary.main };
  const [map, setMap] = React.useState(null);

  React.useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      whenCreated={setMap}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={position} pathOptions={fillBlueOptions} radius={2500} />
    </MapContainer>
  );
};
export default Map;
