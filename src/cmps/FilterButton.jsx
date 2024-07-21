// import React from 'react'

// function FilterButton({ onClick }) {
//   return (
//     <button 
//       onClick={onClick}
//       style={{
//         position: 'absolute',
//         right: 0,
//         top: '50%',
//         transform: 'translateY(-50%)',
//         marginLeft: '16px',
//         padding: '8px 16px',
//         border: '1px solid #DDDDDD',
//         borderRadius: '12px',
//         background: 'white',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//       }}
//     >
//       <span style={{ marginRight: '8px' }}>Filters</span>
//       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5 8H11M2.5 4H13.5M7.5 12H8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     </button>
//   )
// }

// export default FilterButton

import React from 'react'
// import './FilterButton.scss'

function FilterButton({ onClick }) {
  return (
    <button className="filter-button" onClick={onClick}>
      <span>Filters</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8H11M2.5 4H13.5M7.5 12H8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export default FilterButton