import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ address }) => {
  const city = `${address.city}, ${address.state}, ${address.pincode}`;
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; //to track component mount status

    const fetchCoordinates = async () => {
      try {
        console.log("useEffect");
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
        );

        const data = await response.json();

        if (isMounted) {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            console.log(lat, lon);

            setCoordinates([lat, lon]);
            setLoading(false);
          } else {
            setCoordinates([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching geocoding data:", error);
          setError("Error fetching coordinates");
        }
      }
    };

    fetchCoordinates();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {coordinates.length > 0 && (
        <MapContainer
          center={coordinates}
          zoom={coordinates.length > 0 ? 13 : 1}
          style={{ height: "320px", width: "100%" }}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates.length > 0 && (
            <Marker position={coordinates}>
              <Popup>{city}</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
