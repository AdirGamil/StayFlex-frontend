import React from 'react'

function PriceRangeFilter() {
  return (
    <div>
      <h3>Price range</h3>
      <p>Nightly prices including fees and taxes</p>
      {/* Here you would add your price range slider component */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <input
          type="text"
          placeholder="$ 10"
          style={{
            width: '45%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <input
          type="text"
          placeholder="$ 230+"
          style={{
            width: '45%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  )
}

export default PriceRangeFilter
