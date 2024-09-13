'use client'
// components/SimpleMap.tsx
// components/SimpleMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the center position as LatLngExpression (array of two numbers)
const position: LatLngExpression = [3.109864, 101.463521]; 

const SimpleMap: React.FC = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
      className="leaflet-container border-2 border-white rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
