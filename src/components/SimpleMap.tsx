'use client'
// components/SimpleMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position = [3.109864, 101.463521]; // Latitude and Longitude

const SimpleMap: React.FC = () => {
  return (
    <MapContainer 
      center={position as [number, number]} // Ensure the position is typed correctly
      zoom={13}
      scrollWheelZoom={false} // Lock the position
      style={{ height: "400px", width: "100%" }}
      className='border-2 border-white rounded-lg'
    >
      <TileLayer
        attributionControl={true} // Changed from attribution to attributionControl
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Setia City Convention Center
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleMap;
