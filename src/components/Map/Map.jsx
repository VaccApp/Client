import "./Map.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXlvemVtdCIsImEiOiJjbGs4azQzcDQwYW44M3JteTRmNXIyZXE5In0.lgoFVd2sMWHWjU2ZnViRmg";

export default function Map({ lng, lat, chosenCenter }) {
  const mapContainer = useRef();
  const map = useRef(null);
  //   const [lng, setLng] = useState(-3.7);
  //   const [lat, setLat] = useState(40.4);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    }
  }, [lng, lat]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      //   setLng(map.current.getCenter().lng.toFixed(4));
      //   setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  }, [lng, lat, zoom]);

  return (
    <div>
      {/* <div className="sidebar">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div> */}
      <div className="map-container" ref={mapContainer} id="map" />
    </div>
  );
}
