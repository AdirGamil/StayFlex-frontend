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
