import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

function Marker() {
  return (
    <div className="branch-img">
      <h1>📍</h1>
    </div>
  )
}

const API_KEY =
  import.meta.env.GOOGLE_MAP_API || 'AIzaSyBqsrRQVeaOGYAoaXez4Kxa3cSKvektDiw'

export function Map({ stay }) {
  const [coordinates, setCoordinates] = useState({
    lat: stay.loc.lat,
    lng: stay.loc.lng,
  })
  const [zoom, setZoom] = useState(8)

  return (
    <div>
      {/* // Important! Always set the container height explicitly */}
      <div className="map" style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={coordinates}
          zoom={zoom}
        >
          <Marker lat={coordinates.lat} lng={coordinates.lng} />
        </GoogleMapReact>
      </div>
    </div>
  )
}
