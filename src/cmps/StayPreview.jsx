import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import HeartWishlistSvg from '../assets/img/HeartWishlistSvg'
import { useState } from 'react'

const starIcon =
  'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

const wishListIcon = ''

export function StayPreview({ stay }) {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: isHovered,
  }

  return (
    <article
      className="stay-preview"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="wish-list-icon">
        <HeartWishlistSvg />
      </div>
      <Slider {...settings}>
        {stay.imgUrls.map((imgUrl, index) => (
          <div className="imgs" key={index}>
            <img
              className="stay-preview-img"
              src={imgUrl}
              alt={`Stay Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <ul className="stay-preview-info">
        <li className="stay-preview-header">
          <p className="stay-preview-location">
            {stay.loc.city}, {stay.loc.country}
          </p>
          <p className="stay-preview-rating">
            <img
              className="stay-preview-star-icon"
              src={starIcon}
              alt="star icon"
            />
            {stay.reviews[0].rate.toFixed(1)}
          </p>
        </li>
        <li className="stay-preview-distance">
          {stay.kilometersAway} kilometers away
        </li>
        <li className="stay-preview-date-range">{stay.dateRange}</li>
        <li className="stay-preview-price">
          <span>${stay.price.toLocaleString()}</span> night
        </li>
      </ul>
    </article>
  )
}
