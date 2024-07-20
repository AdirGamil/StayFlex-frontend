import React from 'react'
import PriceRangeFilter from './PriceRangeFilter'

function FilterModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                width: '80%',
                maxWidth: '500px'
            }}>
                <h2>Filters</h2>
                <PriceRangeFilter />
                {/* Add more filter options here */}
                <button onClick={onClose} style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#0077ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default FilterModal