// export function ScrollHeader() {
//     return (
//       <header className="scroll-header">
//         <nav>
//           <ul>
//             <li><a href="#photos">Photos</a></li>
//             <li><a href="#amenities">Amenities</a></li>
//             <li><a href="#reviews">Reviews</a></li>
//             <li><a href="#location">Location</a></li>
//           </ul>
//         </nav>
//       </header>
//     )
//   }

// export function ScrollHeader({ price, rating, reviewCount }) {
//   return (
//     <header className="scroll-header">
//       <nav>
//         <ul>
//           <li><a href="#photos">Photos</a></li>
//           <li><a href="#amenities">Amenities</a></li>
//           <li><a href="#reviews">Reviews</a></li>
//           <li><a href="#location">Location</a></li>
//           <div className="scroll-header-info">
//             <span className="price">₪{price}/night</span>
//             <span className="rating">★ {rating}</span>
//             <span className="reviews">· {reviewCount} reviews</span>
//           </div>
//           <button className="reserve-btn">Reserve</button>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './ScrollHeader.scss';

// export function ScrollHeader({ price, rating, reviewCount }) {
//   const navigate = useNavigate();

//   const handleReserve = () => {
//     // Navigate to the reservation confirmation page
//     navigate('/confirm-reservation');
//   };

//   return (
//     <header className="scroll-header">
//       <nav>
//         <ul className="nav-links">
//           <li><a href="#photos">Photos</a></li>
//           <li><a href="#amenities">Amenities</a></li>
//           <li><a href="#reviews">Reviews</a></li>
//           <li><a href="#location">Location</a></li>
//         </ul>
//         <div className="scroll-header-info">
//           <div className="info">
//             <span className="price">${price.toLocaleString()} <span className="night">night</span></span>
//             <div className="info-rr">
//               <span className="rating">★ {rating}</span>
//               <span className="reviews">· {reviewCount} reviews</span>
//             </div>
//           </div>
//           <button className="reserve-btn" onClick={handleReserve}>Reserve</button>
//         </div>
//       </nav>
//     </header>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ScrollHeader({ price, rating, reviewCount }) {
  const navigate = useNavigate();
  const [showHeaderInfo, setShowHeaderInfo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainReservationElement = document.querySelector('.stay-reservation');
      if (mainReservationElement) {
        const rect = mainReservationElement.getBoundingClientRect();
        setShowHeaderInfo(rect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReserve = () => {
    navigate('/confirm-reservation');
  };

  return (
    <header className={`scroll-header ${showHeaderInfo ? 'show-info' : ''}`}>
      <nav>
        <ul className="nav-links">
          <li><a href="#photos">Photos</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#location">Location</a></li>
        </ul>
        <div className="scroll-header-info">
          <div className="info">
            <span className="price">${price.toLocaleString()} <span className="night">night</span></span>
            <div className="info-rr">
              <span className="rating">★ {rating}</span>
              <span className="reviews">· {reviewCount} reviews</span>
            </div>
          </div>
          <button className="reserve-btn" onClick={handleReserve}>Reserve</button>
        </div>
      </nav>
    </header>
  );
}