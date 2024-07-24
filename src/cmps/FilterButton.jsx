import React from 'react'

 export function FilterButton({ onClick }) {
  return (
    <button className="filter-button" onClick={onClick}>
      <span>Filters</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 8H11M2.5 4H13.5M7.5 12H8.5"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

// export default FilterButton
