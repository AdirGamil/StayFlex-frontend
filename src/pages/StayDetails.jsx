import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { ScrollNav } from '../cmps/ScrollNav'
import { loadStay } from '../store/actions/stay.actions'

import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'
import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation'

import {
  pluralize,
  calculateAverageRating,
  getRandomIntInclusive,
} from '../services/util.service'

const starIcon =
  'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'
const heartIcon =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471955/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_rtstwz.svg'
const shareIcon =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471943/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_lbzdem.svg'

const hairDryer =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721722141/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_1_gbrmgx.svg'
const wifi =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721722908/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_2_ttkoym.svg'
const dryer =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723058/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_3_ragj7v.svg'
const wineGlasses =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723188/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_4_kygktq.svg'
const cookingBasics =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723388/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_5_v24dsh.svg'
const evCharger =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723478/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_6_svffx5.svg'
const carbonMonoxideAlarm =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723578/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_7_isgcfs.svg'
const extraPillowsAndBlankets =
  'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721725228/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_8_lsbqpc.svg'
const TV =
  'https://res.cloudinary.com/doahdwb2g/image/upload/v1721908788/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDI0_g0kyfy.svg'
const GardenView =
  'https://res.cloudinary.com/doahdwb2g/image/upload/v1721908837/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_1_kdwdla.svg'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector((storeState) => storeState.stayModule.stay)
  const amenityIcons = {
    'Hair dryer': hairDryer,
    Wifi: wifi,
    Dryer: dryer,
    Wineglasses: wineGlasses,
    'Cooking basics': cookingBasics,
    'Ev charger': evCharger,
    'Carbon monoxide alarm': carbonMonoxideAlarm,
    'Extra pillows and blankets': extraPillowsAndBlankets,
    'TV': TV,
    'Garden view': GardenView,
  }

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  const averageRating = calculateAverageRating(stay.reviews)

  const reviewCount = stay.reviews ? stay.reviews.length : 0

  return (
    <section className="stay-details main-layout">
      {/* <ScrollNav /> */}
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
          <div className="stay-summary">
            <h2>
              {stay.type} in {stay.loc.city}, {stay.loc.country}
            </h2>
            <p className="stay-details-list">
              {pluralize(stay.capacity, 'guest')} ·{' '}
              {pluralize(stay.bedrooms, 'bedroom')} ·{' '}
              {pluralize(stay.beds, 'bed')} · {pluralize(stay.baths, 'bath')}
            </p>
            <div className="rating-reviews">
              <span className="star-icon">
                <img src={starIcon} alt="" />
              </span>
              <span className="rating">{averageRating}</span>
              {reviewCount > 0 && (
                <>
                  <span className="separator">·</span>
                  <a href="#reviews" className="reviews-link">
                    {pluralize(reviewCount, 'review')}
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="stay-host-details">
            <div className="host">
              {stay.host &&
                typeof stay.host === 'object' &&
                stay.host.imgUrl && (
                  <img src={stay.host.imgUrl} alt="" className="host-img" />
                )}
              <div className="host-info">
                <div>
                  Hosted by{' '}
                  {typeof stay.host === 'object'
                    ? stay.host.fullname
                    : stay.host}
                </div>
                <div className="host-duration">
                  {getRandomIntInclusive(2, 6)} years hosting
                </div>
              </div>
            </div>
          </div>

          <div className="stay-description">
            <p>{stay.summary}</p>
          </div>

          {/* <div className="stam-div">TEST DIV FOR SCROLLING</div> */}
          <div className="stay-amenities">
            <h2>What this place offers</h2>

            <ul className="amenities-list">
              {stay.amenities.map((amenity, index) => (
                <li key={index}>
                  {amenityIcons[amenity] && (
                    <img src={amenityIcons[amenity]} alt={`${amenity} icon`} />
                  )}
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <StayReservation stay={stay} />
      </section>
      <section className="header-reviews">
        <div className="header">★ 5.0 . 6 reviews
        </div>
        <div className="reviews-container">

          {stay.reviews.map((review, index) => (
            <article className="review" key={index}>
              <div className="user">
                <img src={review.by.imgUrl} alt="User Avatar" />
                <div className="user-details-txt">
                  <h3>{review.by.fullname}</h3>
                  <p>{review.by._id}</p>
                </div>
              </div>
              <div className="review-txt-date">
                <div className="review-rating">
                  <p>★★★★★<span></span></p>
                  <h6>.</h6>
                  <h4>July 2024 . <span> Stayed a few nights</span></h4>
                </div>
                <div className="review-content">
                  <p>{review.txt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="map-container">
          <article>
            <h1> Where you'll be</h1>
            <div className="map"> map here </div>
            <div className="city-info">city info here</div>
          </article>
        </div>
      </section>
    </section>
  )
}


