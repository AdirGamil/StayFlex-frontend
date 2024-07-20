// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css"
// import { loadStay } from '../store/actions/stay.actions'

// import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'
// import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation'

// const starIcon = 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'
// const heartIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471955/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_rtstwz.svg'
// const shareIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471943/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_lbzdem.svg'

// export function StayDetails() {
//   const { stayId } = useParams()
//   const stay = useSelector(storeState => storeState.stayModule.stay)


//   useEffect(() => {
//     loadStay(stayId)
//   }, [stayId])


//   if (!stay) return <div>Loading...</div>

//   return (
//     <section className="stay-details main-layout">
//       <section className="stay-header">
//         <h2 className="stay-title">
//           {stay.name} 4 bedroom {stay.type}
//         </h2>

//         <div className="share-save">
//           <div>
//           <img src={shareIcon} alt="share-icon" />
//             Share
//             </div>
//           <div>
//             <img src={heartIcon} alt="heart-icon" />
//             Save
//           </div>
//         </div>
//       </section>

//       <div className="stay-gallery">
//         <StayGallery imgUrls={stay.imgUrls} />
//       </div>

//       <section className="info-reservation">
//         <div className="stay-info">

//           <div className="loc-and-amenities">
//             <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>

//             <ul className="info-list">
//               <li>{stay.capacity} guests</li>  ·
//               <li>4 bedrooms</li>  ·
//               <li>4 beds</li>  ·
//               <li>2 baths</li>
//             </ul>

//             <div className="rating-reviews">
//               <div className="stay-rating">
//                 <img
//                   className="stay-rating-star-icon"
//                   src={starIcon}
//                   alt="star-icon"
//                 />
//                 {stay.reviews && stay.reviews.length > 0 ? stay.reviews[0].rate.toFixed(1) : 'N/A'}  ·
//               </div>
//               <a href='' className="stay-reviews">{stay.reviews ? stay.reviews.length : 0} reviews</a>
//             </div>

//           </div>

//           <div className="stay-host-details">
//             <div className="host">
//               {stay.host && typeof stay.host === 'object' && stay.host.imgUrl && (
//                 <img src={stay.host.imgUrl} alt="" />
//               )}
//               <div>Hosted by {typeof stay.host === 'object' ? stay.host.fullname : stay.host}</div>
//             </div>
//           </div>

//           <div className="stay-description">
//             <p>{stay.summary}</p>
//           </div>
//         </div>

//         <StayReservation stay={stay} />
//       </section>
//     </section>
//   )
// }

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStay } from '../store/actions/stay.actions';

import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery';
import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation';

const starIcon = 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png';
const heartIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471955/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_rtstwz.svg';
const shareIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471943/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_lbzdem.svg';

export function StayDetails() {
  const { stayId } = useParams();
  const stay = useSelector((storeState) => storeState.stayModule.stay);

  useEffect(() => {
    loadStay(stayId);
  }, [stayId]);

  // Ensuring stay is defined
  if (!stay) return <div>Loading...</div>;

  // Added null checks and default values
  const averageRating = stay.reviews && stay.reviews.length > 0
    ? (stay.reviews.reduce((sum, review) => sum + review.rate, 0) / stay.reviews.length).toFixed(1)
    : 'New';

  const reviewCount = stay.reviews ? stay.reviews.length : 0;

  return (
    <section className="stay-details main-layout">
      <header className="stay-header">
        <h1 className="stay-title">{stay.name}</h1>
        <div className="share-save">
          <button className="share-btn">
            <img src={shareIcon} alt="share-icon" />
            Share
          </button>
          <button className="save-btn">
            <img src={heartIcon} alt="heart-icon" />
            Save
          </button>
        </div>
      </header>

      <div className="stay-gallery">
        <StayGallery imgUrls={stay.imgUrls} />
      </div>

      <section className="stay-info-container">
        <div className="stay-info">
          <h2>Entire villa in {stay.loc.city}, {stay.loc.country}</h2>
          <p className="stay-details-list">
            {stay.capacity} guests · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.bathrooms} baths
          </p>
          <div className="rating-reviews">
            <span className="star-icon">★</span>
            <span className="rating">{averageRating}</span>
            {/* Conditionally rendering the reviews link based on the review count */}
            {reviewCount > 0 && (
              <>
                <span className="separator">·</span>
                <a href="#reviews" className="reviews-link">{reviewCount} reviews</a>
              </>
            )}
          </div>
        </div>

        {/* <div className="stay-host-details">
          <div className="host">
            {stay.host && typeof stay.host === 'object' && stay.host.imgUrl && (
              <img src={stay.host.imgUrl} alt="" />
            )}
            <div>Hosted by {typeof stay.host === 'object' ? stay.host.fullname : stay.host}</div>
          </div>
        </div>

        <div className="stay-description">
          <p>{stay.summary}</p>
        </div> */}


        <StayReservation stay={stay} />
      </section>
    </section >
  );
}
