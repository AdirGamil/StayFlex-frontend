
// import React, { useState, useRef } from 'react'
// import FilterModal from '../cmps/FilterModal.jsx'
// import { labelImageMap } from '../services/util.service.js'

// const ltr =
//   'https://res.cloudinary.com/doahdwb2g/image/upload/v1721496423/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDEy_uge6u3.svg'

// export function StayLabels({ onLabelClick }) {
//   const [showAll, setShowAll] = useState(false)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const containerRef = useRef(null)
//   const [selectedLabel, setSelectedLabel] = useState(null)
//   const handleLabelClick = createHandleLabelClick(
//     setSelectedLabel,
//     onLabelClick
//   )

//   function createHandleLabelClick(setSelectedLabel, onLabelClick) {
//     return function handleLabelClick(label) {
//       setSelectedLabel(label === selectedLabel ? null : label)
//       onLabelClick(label)
//     }
//   }

//   return (
//     <section className="stay-labels">
//       <div className="filters-container" ref={containerRef}>
//         {Object.entries(labelImageMap)
//           .slice(0, showAll ? undefined : 14)
//           .map(([label, iconPath]) => (
//             <div
//               key={label}
//               onClick={() => handleLabelClick(label)}
//               className={`label-item ${label === selectedLabel ? 'selected' : ''
//                 }`}
//             >
//               <img
//                 src={iconPath}
//                 alt={label}
//                 style={{ opacity: label === selectedLabel ? 1 : 0.6 }}
//               />
//               <span
//                 style={{
//                   color: label === selectedLabel ? '#000' : '#717171',
//                   fontWeight: label === selectedLabel ? 'bold' : 'normal',
//                 }}
//               >
//                 {label}
//               </span>
//               {label === selectedLabel && (
//                 <div className="selected-indicator" />
//               )}
//             </div>
//           ))}
//         {/* <button className="dir" onClick={scrollRight}> */}
//         <button className="dir">
//           <svg
//             viewBox="0 0 16 16"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//             role="presentation"
//             focusable="false"
//           >
//             <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
//           </svg>
//         </button>
//         <button onClick={() => setIsModalOpen(true)} className="filter-button">
//           <svg
//             viewBox="0 0 32 32"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//             role="presentation"
//             focusable="false"
//           >
//             <path
//               fill="none"
//               d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"
//             />
//           </svg>
//           <span>Filters</span>
//         </button>
//       </div>
//       <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   )
// }

// import React, { useState } from 'react'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import FilterModal from '../cmps/FilterModal.jsx'
// import { labelImageMap } from '../services/util.service.js'

// export function StayLabels({ onLabelClick }) {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedLabel, setSelectedLabel] = useState(null)

//   const handleLabelClick = (label) => {
//     setSelectedLabel(label === selectedLabel ? null : label)
//     onLabelClick(label)
//   }

//   const settings = {
//     infinite: false,
//     speed: 500,
//     slidesToShow: 8, // Adjust this based on your design
//     slidesToScroll: 3,
//     arrows: true,
//     lazyLoad: 'ondemand',
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   }

//   return (
//     <section className="stay-labels">
//       <Slider {...settings}>
//         {Object.entries(labelImageMap).map(([label, iconPath]) => (
//           <div
//             key={label}
//             onClick={() => handleLabelClick(label)}
//             className={`label-item ${label === selectedLabel ? 'selected' : ''}`}
//           >
//             <img
//               src={iconPath}
//               alt={label}
//               className="label-image"
//               width="24"
//               height="24"
//             />
//             <span>{label}</span>
//             {label === selectedLabel && <div className="selected-indicator" />}
//           </div>
//         ))}
//       </Slider>
//       <button onClick={() => setIsModalOpen(true)} className="filter-button">
//         <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
//           <path fill="none" d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3" />
//         </svg>
//         <span>Filters</span>
//       </button>
//       <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   )
// }

// import React, { useState, useRef } from 'react'
// import { labelImageMap } from '../services/util.service.js'

// export function StayLabels({ onLabelClick }) {
//   const [selectedLabel, setSelectedLabel] = useState(null)
//   const scrollContainerRef = useRef(null)

//   const handleLabelClick = (label) => {
//     setSelectedLabel(label === selectedLabel ? null : label)
//     onLabelClick(label)
//   }

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 200; // Adjust this value as needed
//       scrollContainerRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   }

//   return (
//     <div className="stay-labels-wrapper">
//       <button className="scroll-button left" onClick={() => scroll('left')}>&#10094;</button>
//       <div className="stay-labels-container" ref={scrollContainerRef}>
//         {Object.entries(labelImageMap).map(([label, iconPath]) => (
//           <div
//             key={label}
//             onClick={() => handleLabelClick(label)}
//             className={`label-item ${label === selectedLabel ? 'selected' : ''}`}
//           >
//             <img src={iconPath} alt={label} className="label-image" />
//             <span>{label}</span>
//           </div>
//         ))}
//       </div>
//       <button className="scroll-button right" onClick={() => scroll('right')}>&#10095;</button>
//       <button className="filter-button">
//         <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{display: "block", height: "14px", width: "14px", fill: "currentColor"}}>
//           <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
//         </svg>
//         <span>Filters</span>
//       </button>
//     </div>
//   )
// }

import React, { useState, useRef, useEffect } from 'react';
import { labelImageMap } from '../services/util.service.js';
import FilterModal from '../cmps/FilterModal.jsx';

export function StayLabels({ onLabelClick }) {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLabelClick = (label) => {
    setSelectedLabel(label === selectedLabel ? null : label);
    onLabelClick(label);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowLeftButton(scrollContainerRef.current.scrollLeft > 0);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="main-labels-container">
        <div className="stay-labels-wrapper">
          {showLeftButton && (
            <button className="scroll-button left" onClick={() => scroll('left')}>&#10094;</button>
          )}
          <div className="stay-labels-container" ref={scrollContainerRef}>
            {Object.entries(labelImageMap).map(([label, iconPath]) => (
              <div
                key={label}
                onClick={() => handleLabelClick(label)}
                className={`label-item ${label === selectedLabel ? 'selected' : ''}`}
              >
                <img src={iconPath} alt={label} className="label-image" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right')}>&#10095;</button>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="filter-button">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{display: "block", height: "14px", width: "14px", fill: "currentColor"}}>
            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
          <span>Filters</span>
        </button>
      </div>
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
