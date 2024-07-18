const starIcon =
  'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

export function StayPreview({ stay }) {
  return (
    <article className="stay-preview">
      <img className="stay-preview-img" src={stay.imgUrls[0]} alt={stay.name} />
      <div className="stay-preview-info">
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
        <p className="stay-preview-distance">
          {stay.kilometersAway} kilometers away
        </p>
        <p className="stay-preview-date-range">{stay.dateRange}</p>
        <p className="stay-preview-price">
          <span>${stay.price}</span> night
        </p>
      </div>
    </article>
  )
}
