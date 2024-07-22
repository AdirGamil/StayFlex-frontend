import React, { useState } from 'react'

export function MiniSearch({ onSearch }) {
  const [location, setLocation] = useState('Anywhere')
  const [date, setDate] = useState('Any week')
  const [guests, setGuests] = useState('Add guests')

  const handleSearch = () => {
    onSearch({ location, date, guests })
  }

  return (
    <div className="mini-search-bar">
      <div className="mini-search-item" onClick={() => setLocation('Anywhere')}>{location}</div>
      <div className="mini-search-item" onClick={() => setDate('Any week')}>{date}</div>
      <div className="mini-search-item" onClick={() => setGuests('Add guests')}>{guests}</div>
      <button className="search-button" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-0.46 5.28-1.3l5.01 5.01c0.39 0.39 1.02 0.39 1.41 0l1.41-1.41c0.38-0.38 0.39-1.01 0-1.41zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
  )
}

export default MiniSearch