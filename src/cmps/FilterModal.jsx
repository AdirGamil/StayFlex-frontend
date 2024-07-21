import React, { useState } from 'react'
import ReactSlider from 'react-slider'

function FilterModal({ isOpen, onClose, onFilterChange }) {
    if (!isOpen) return null

    const [priceRange, setPriceRange] = useState([10, 570])

    // This would ideally come from your data
    const priceDistribution = [0.5, 2, 5, 4, 5, 12, 7, 8, 9, 10, 11, 10, 11, 20, 9, 8, 7, 16, 5, 18, 3, 2, 1]

    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);
        if (typeof onFilterChange === 'function') {
          onFilterChange({ minPrice: newRange[0], maxPrice: newRange[1] });
        }
      };

    return (
        <div className="filter-modal-overlay">
            <div className="filter-modal-content">
                <h2>Filters</h2>
                <div className="price-range-filter">
                    <h3>Price range</h3>
                    <p>Nightly prices including fees and taxes</p>
                    <div className="price-histogram">
                        {priceDistribution.map((value, index) => (
                            <div key={index} className="histogram-bar" style={{ height: `${value * 4}px` }}></div>
                        ))}
                    </div>
                    <ReactSlider
                        className="price-slider"
                        thumbClassName="price-slider-thumb"
                        trackClassName="price-slider-track"
                        value={priceRange}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                        renderThumb={(props, state) => <div {...props}></div>}
                        pearling
                        minDistance={10}
                        min={10}
                        max={570}
                        onChange={handlePriceRangeChange}
                    />
                    <div className="price-inputs">
                        <div className="price-input">
                            <label>Minimum</label>
                            <input type="text" value={`$${priceRange[0]}`} readOnly />
                        </div>
                        <div className="price-input">
                            <label>Maximum</label>
                            <input type="text" value={`$${priceRange[1]}+`} readOnly />
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="filter-modal-close-button">
                    Close
                </button>
            </div>
        </div>
    )
}

export default FilterModal