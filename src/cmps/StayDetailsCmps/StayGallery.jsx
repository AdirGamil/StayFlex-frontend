import React from 'react';
// import './Gallery.scss';

export function StayGallery({ imgUrls }) {
  return (
    <div className="gallery-grid">
      {imgUrls.slice(0, 5).map((url, idx) => (
        <div key={idx} className={`gallery-item gallery-item-${idx}`}>
          <img src={url} alt={`Gallery image ${idx + 1}`} />
        </div>
      ))}
      <button className="show-all-btn">Show all photos</button>
    </div>
  );
}
