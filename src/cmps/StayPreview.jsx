import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const starIcon =
  'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

export function StayPreview({ stay }) {
  return (
    <article className="stay-preview">
      <img className="stay-preview-img" src={stay.imgUrls[0]} alt={stay.name} />
      <ul className="stay-preview-info">
        {/* <li className="stay-name">{stay.name}</li> */}
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
            {stay.reviews[0].rate}
          </p>
        </li>
        <li className="stay-preview-distance">
          {stay.kilometersAway} Kilometers away
        </li>
        <li className="stay-preview-date-range">{stay.dateRange}</li>
        <li className="stay-preview-price">
          <span>${stay.price}</span> night
        </li>
      </ul>

      <Slider>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      </Slider>
    </article>
  )
}
