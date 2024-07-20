import React from 'react';

const gridIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471957/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDE_hkxaep.svg'

export function StayGallery({ imgUrls }) {
  return (
    <div className="gallery-grid">
      {imgUrls.slice(0, 5).map((url, idx) => (
        <div key={idx} className={`gallery-item gallery-item-${idx}`}>
          <img src={url} alt={`Gallery image ${idx + 1}`} />
        </div>
      ))}
      <div className="gallery-btn-container">
        <button className="show-all-btn">
          <img src={gridIcon} alt="" />
          Show all photos
        </button>
      </div>
    </div>
  );
}
