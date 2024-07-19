// {/* <Link to="/">Back to list</Link> */ }
// const starIcon =
//   'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'



// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'


// import { loadStay } from '../store/actions/stay.actions'


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

//         <h1 className="stay-title">
//           {stay.name} 4 bedroom {stay.type}
//         </h1>

//         <div className="share-save">
//           <a href="">Share</a>
//           <a href="">Save</a>
//         </div>

//       </section>

//       <div className="stay-gallery">
//         <img src={stay.imgUrls} alt="" />
//       </div>

//       <section className="info-reservation">

//         <div className="stay-info">

//           <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>

//           <ul className="info-list">
//             <li>{stay.capacity} guests</li>
//             <li>4 bedrooms</li>
//             <li>4 beds</li>
//             <li>2 baths</li>
//           </ul>

//           <div className="rating-reviews">

//             <div className="stay-rating">
//               <img
//                 className="stay-rating-star-icon"
//                 src={starIcon}
//                 alt="star icon"
//               />
//               {stay.reviews[0].rate}.0
//             </div>
//             <a href='' className="stay-reviews">5 reviews</a>
//           </div>
//           <div className="stay-host-details">

//             <div className="host">
//               {/* <img src={stay.host.imgUrl} alt="" /> */}
//               <div>Hosted by {stay.host}</div>
//             </div>
//           </div>

//           <div className="stay-description">
//             <p>
//               {stay.summary}
//             </p>
//           </div>
//         </div>


//         <div className="reservation">
//           <div className="reservation-selectors">
//             <div className="reservation-price">
//               <h2>
//                 ${stay.price}
//                 &nbsp;
//               </h2>
//               <span>night</span>
//             </div>
//           </div>
//           <button className="reserve-btn">Reserve</button>
//           <p className="charged-p">You won't be charged yet.</p>
//         </div>
//       </section>
//     </section>
//   )
// }

import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/actions/stay.actions'

const starIcon = 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className="stay-details main-layout">
      <section className="stay-header">
        <h1 className="stay-title">
          {stay.name} 4 bedroom {stay.type}
        </h1>

        <div className="share-save">
          <a href="">Share</a>
          <a href="">Save</a>
        </div>
      </section>

      <div className="stay-gallery">
        {stay.imgUrls && (
          Array.isArray(stay.imgUrls) 
            ? stay.imgUrls.map((url, index) => <img key={index} src={url} alt="" />)
            : <img src={stay.imgUrls} alt="" />
        )}
      </div>

      <section className="info-reservation">
        <div className="stay-info">
          <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>

          <ul className="info-list">
            <li>{stay.capacity} guests</li>
            <li>4 bedrooms</li>
            <li>4 beds</li>
            <li>2 baths</li>
          </ul>

          <div className="rating-reviews">
            <div className="stay-rating">
              <img
                className="stay-rating-star-icon"
                src={starIcon}
                alt="star icon"
              />
              {stay.reviews && stay.reviews.length > 0 ? stay.reviews[0].rate : 'N/A'}.0
            </div>
            <a href='' className="stay-reviews">{stay.reviews ? stay.reviews.length : 0} reviews</a>
          </div>

          <div className="stay-host-details">
            <div className="host">
              {stay.host && typeof stay.host === 'object' && stay.host.imgUrl && (
                <img src={stay.host.imgUrl} alt="" />
              )}
              <div>Hosted by {typeof stay.host === 'object' ? stay.host.fullname : stay.host}</div>
            </div>
          </div>

          <div className="stay-description">
            <p>{stay.summary}</p>
          </div>
        </div>

        <div className="reservation">
          <div className="reservation-selectors">
            <div className="reservation-price">
              <h2>${stay.price}&nbsp;</h2>
              <span>night</span>
            </div>
          </div>
          <button className="reserve-btn">Reserve</button>
          <p className="charged-p">You won't be charged yet.</p>
        </div>
      </section>
    </section>
  )
}