import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlbGFiYSIsImEiOiJja3locWRhejgxcjNtMm51cm9zNHZjMGZ4In0.YUW_CcndK5LwRgTECN6WRA';

export default function MapBox() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(38.90);
    const [lat, setLat] = useState(8.94);
    const [zoom, setZoom] = useState(3);
    const data = [
        {
            "location": "Manhattan Ave & Norman Ave at NE corner",
            "city": "Brooklyn",
            "state": "New York",
            "coordinates": [-73.9516030004786, 40.72557300071668],
        },
        {
            "location": "6th Ave & 42nd St at NW corner",
            "city": "Manhattan",
            "state": "New York",
            "coordinates": [-73.98393399979334, 40.75533300052329],
        },
        {
            "location": "Essex St & Delancey St at SE corner",
            "city": "Manhattan",
            "state": "New York",
            "coordinates": [-73.9882730001973, 40.718207001246554],
        }
    ]

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        data.forEach((location) => {
            console.log(location);
            var marker = new mapboxgl.Marker()
                .setLngLat(location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 30 })
                    .setHTML('<h4>' + location.city + '</h4>' + location.location))
                .addTo(map.current);

        })
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });



    return (
        <div className='px-10 '>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container rounded shadow-lg shadow-cyan-500/50 bg-cyan-500" />
        </div>
    );
}
