
import React, { useState } from 'react'

export function Amenities({ amenities, amenityIcons }) {
    const [showAll, setShowAll] = useState(false)

    const handleShowAllClick = () => {
        setShowAll(true)
    }

    const handleCloseModal = () => {
        setShowAll(false)
    }

    return (
        <div id="amenities" className="stay-amenities">
            <h2>What this place offers</h2>
            <ul className="amenities-list">
                {amenities.slice(0, 12).map((amenity, index) => (
                    <li key={index}>
                        {amenityIcons[amenity] && (
                            <img src={amenityIcons[amenity]} alt={`${amenity} icon`} />
                        )}
                        {amenity}
                    </li>
                ))}
                {!showAll && amenities.length > 12 && (
                    <button onClick={handleShowAllClick} className="show-all-button">
                        Show all {amenities.length} amenities
                    </button>
                )}
            </ul>
            {showAll && (
                 <div className="modal-overlay" onClick={handleCloseModal}>
                 <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                     <button onClick={handleCloseModal} className="close-button">
                         &times
                     </button>
                     <h2>What this place offers</h2>
                     <ul className="amenities-list">
                         {amenities.map((amenity, index) => (
                             <li key={index}>
                                 {amenityIcons[amenity] && (
                                     <img src={amenityIcons[amenity]} alt={`${amenity} icon`} />
                                 )}
                                 {amenity}
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>
         )}
     </div>
    )
}
