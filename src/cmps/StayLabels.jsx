import React, { useState, useRef } from 'react'
import FilterModal from '../cmps/FilterModal.jsx'
import { labelImageMap } from '../services/util.service.js'

const ltr = 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721496423/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDEy_uge6u3.svg'

export function StayLabels({ onLabelClick }) {
  const [showAll, setShowAll] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const [selectedLabel, setSelectedLabel] = useState(null)
  const handleLabelClick = createHandleLabelClick(setSelectedLabel, onLabelClick)

  function createHandleLabelClick(setSelectedLabel, onLabelClick) {
    return function handleLabelClick(label) {
      setSelectedLabel(label === selectedLabel ? null : label)
      onLabelClick(label)
    }
  }
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <section className="stay-labels">
      <div className="filters-container" ref={containerRef}>
        {Object.entries(labelImageMap).slice(0, showAll ? undefined : 15).map(([label, iconPath]) => (
          <div
            key={label}
            onClick={() => handleLabelClick(label)}
            className={`label-item ${label === selectedLabel ? 'selected' : ''}`}
          >
            <img src={iconPath} alt={label} />
            <span>{label}</span>
            <div className="selected-indicator" />
          </div>
        ))}
        {/* <button className="dir" onClick={scrollRight}> */}
        {/* <button
        onClick={() => setIsModalOpen(true)}
        className="filter-button"
      > */}
        <button className="dir" onClick={scrollRight}>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
            <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
          </svg>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="filter-button"
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path fill="none" d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3" />
          </svg>
          <span>Filters</span>
        </button>
      </div>
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

// import React, { useState, useRef } from 'react'
// import FilterModal from '../cmps/FilterModal.jsx'
// import { labelImageMap } from '../services/util.service.js'

// export function StayLabels({ onLabelClick }) {
//   const [selectedLabel, setSelectedLabel] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const containerRef = useRef(null)

//   const handleLabelClick = (label) => {
//     setSelectedLabel(label === selectedLabel ? null : label)
//     onLabelClick(label)
//   }

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
//     }
//   }

//   return (
//     <section className="stay-labels">
//       <div className="filters-container" ref={containerRef}>
//         {Object.entries(labelImageMap).slice(0, 15).map(([label, iconPath]) => (
//           <div
//             key={label}
//             onClick={() => handleLabelClick(label)}
//             className={`label-item ${label === selectedLabel ? 'selected' : ''}`}
//           >
//             <img src={iconPath} alt={label} />
//             <span>{label}</span>
//             <div className="selected-indicator" />
//           </div>
//         ))}

//         <button className="dir" onClick={scrollRight}>
//           <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
//             <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
//           </svg>
//         </button>

//         <button onClick={() => setIsModalOpen(true)} className="filter-button">
//           <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
//             <path fill="none" d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3" />
//           </svg>
//           <span>Filters</span>
//         </button>
//       </div>

//       <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   )
// }