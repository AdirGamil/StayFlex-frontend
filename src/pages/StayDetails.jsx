import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/actions/stay.actions'

import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'
import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation'

const starIcon = 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'
const heartIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471955/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_rtstwz.svg'
const shareIcon = 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471943/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_lbzdem.svg'

function pluralize(count, singular, plural = null) {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || singular + 's'}`
}

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector((storeState) => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  const averageRating = stay.reviews && stay.reviews.length > 0
    ? (stay.reviews.reduce((sum, review) => sum + review.rate, 0) / stay.reviews.length).toFixed(1)
    : 'New'

  const reviewCount = stay.reviews ? stay.reviews.length : 0

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
          <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>
          <p className="stay-details-list">
            {pluralize(stay.capacity, 'guest')} · {pluralize(stay.bedrooms, 'bedroom')} · {pluralize(stay.beds, 'bed')} · {pluralize(stay.bathrooms, 'bath')}
          </p>
          <div className="rating-reviews">
            <span className="star-icon"><img src={starIcon} alt="" /></span>
            <span className="rating">{averageRating}</span>
            {reviewCount > 0 && (
              <>
                <span className="separator">·</span>
                <a href="#reviews" className="reviews-link">{pluralize(reviewCount, 'review')}</a>
              </>
            )}
          </div>

          <div className="stay-host-details">
            <div className="host">
              {stay.host && typeof stay.host === 'object' && stay.host.imgUrl && (
                <img src={stay.host.imgUrl} alt="" className="host-img" />
              )}
              <div className="host-info">
                <div>Hosted by {typeof stay.host === 'object' ? stay.host.fullname : stay.host}</div>
                <div className="host-duration">7 years hosting</div>
              </div>
            </div>
          </div>

          <div className="stay-description">
            <p>{stay.summary}</p>
          </div>
          
          <div className="stam-div">HELLO</div>
        </div>

        <StayReservation stay={stay} />
      </section>
    </section>
  )
}
