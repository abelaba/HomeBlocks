import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import { PORT, mapBoxAPI } from "../utils/constants";

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(38.9);
  const [lat, setLat] = useState(8.94);
  const [zoom, setZoom] = useState(1);

  mapboxgl.accessToken = mapBoxAPI;
  const { viewAllProperties } = useContext(PropertyHandlingContext);

  useEffect(async () => {
    if (!map.current) {
      // Initialize the map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [lng, lat],
        zoom: zoom,
      });
    }

    // Load properties and set the state
    const loadedProperties = await viewAllProperties();

    // Add markers for each property
    loadedProperties.forEach((property) => {
      const { coordinates } = property;
      // Create a marker
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(popUp(property))) // Customize the popup content
        .addTo(map.current);
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const popUp = (property) => {
    return `
            <div className="max-w-xl">
                <a href=/property/${property.propertyCount}> 
                    <img src=http://localhost:${PORT}/${property.rentalImage} alt="House" />
                </a>
                <p class="font-bold text-base mt-2">Price: ${property.price} ETH</p>  
            </div>
        `;
  };

  return (
    <div className="px-10 ">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container rounded shadow-lg shadow-cyan-500/50 bg-cyan-500"
      />
    </div>
  );
}
