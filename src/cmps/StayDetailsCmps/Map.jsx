import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

function Marker() {
  return (
    <div className="branch-img">
      <h1>🚩</h1>
      {/* <div className="icon-wrapper">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
          <path d="M16 1c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15zm0 2C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
        </svg>
      </div> */}
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
