import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { loadStay } from '../store/actions/stay.actions'

import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'
import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation'

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
        {/* {stay.imgUrls && (
          Array.isArray(stay.imgUrls)
            ? stay.imgUrls.map((url, index) => <img key={index} src={url} alt="" />)
            : <img src={stay.imgUrls} alt="" />
        )} */}
        <StayGallery imgUrls={stay.imgUrls} />
      </div>

      <section className="info-reservation">
        <div className="stay-info">

          <div className="loc-and-amenities">
            <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>

            <ul className="info-list">
              <li>{stay.capacity} guests</li>  ·
              <li>4 bedrooms</li>  ·
              <li>4 beds</li>  ·
              <li>2 baths</li>
            </ul>

            <div className="rating-reviews">
              <div className="stay-rating">
                <img
                  className="stay-rating-star-icon"
                  src={starIcon}
                  alt="star icon"
                />
                {stay.reviews && stay.reviews.length > 0 ? stay.reviews[0].rate.toFixed(1) : 'N/A'}  ·
              </div>
              <a href='' className="stay-reviews">{stay.reviews ? stay.reviews.length : 0} reviews</a>
            </div>

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

        <StayReservation stay={stay}/>
      </section>
    </section>
  )
}
