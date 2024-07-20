import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { loadStay } from '../store/actions/stay.actions'

import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'

const starIcon = 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  })
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  function handleStartDateChange(date) {
    setStartDate(date)
  }

  function handleEndDateChange(date) {
    setEndDate(date)
  }

  function toggleGuestsDropdown() {
    setIsGuestsDropdownOpen(!isGuestsDropdownOpen);
  }

  function handleGuestsChange(type, value) {
    const newGuests = { ...guests, [type]: Math.max(0, value) };
    setGuests(newGuests);
    setFilterToEdit({ ...filterToEdit, guests: newGuests });
  }

  const calculateNumberOfNights = () => {
    if (!startDate || !endDate) return 0;
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const numberOfNights = calculateNumberOfNights();
  const subtotal = stay ? stay.price * numberOfNights : 0;
  const taxes = subtotal * 0.17; // 17% of the subtotal
  const totalPrice = subtotal + taxes;

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

        {/* //RESERVATION SECTION */}

        <div className="reservation">
          <div className="reservation-selectors">
            <div className="reservation-price">
              <h2>${stay.price}&nbsp;</h2>
              <span>night</span>
            </div>
          </div>

          <div className="date-picker-container">
            <div className="check-in">
              {/* <label>Check in</label> */}
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                monthsShown={2}
                dateFormat="dd/MM/yyyy"
                placeholderText="CHECK-IN"
              />
            </div>
            <div className="check-out">
              {/* <label>Check out</label> */}
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                monthsShown={2}
                dateFormat="dd/MM/yyyy"
                placeholderText="CHECKOUT"
              />
            </div>
          </div>

          <div className="guests-selector">
            <button className="guests-button" onClick={toggleGuestsDropdown}>
              {/* <span>Who</span> */}
              <span>
                {guests.adults + guests.children} guests
                {guests.infants > 0 && `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`}
                {guests.pets > 0 && `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`}
              </span>
            </button>
            <div className={`guests-dropdown ${isGuestsDropdownOpen ? 'active' : ''}`}>
              {[
                { type: 'adults', label: 'Adults', subLabel: 'Ages 13 or above' },
                { type: 'children', label: 'Children', subLabel: 'Ages 2-12' },
                { type: 'infants', label: 'Infants', subLabel: 'Under 2' },
                { type: 'pets', label: 'Pets', subLabel: 'Bringing a service animal?' },
              ].map(({ type, label, subLabel }) => (
                <div key={type}>
                  <div className="guest-type">
                    <label>{label}</label>
                    <span>{subLabel}</span>
                  </div>
                  <div className="guest-counter">
                    <button
                      onClick={() => handleGuestsChange(type, guests[type] - 1)}
                      disabled={guests[type] === 0 || (type === 'adults' && guests[type] === 1)}
                    >
                      -
                    </button>
                    <span>{guests[type]}</span>
                    <button onClick={() => handleGuestsChange(type, guests[type] + 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="reserve-btn">Reserve</button>
          <p className="charged-p">You won't be charged yet</p>

          <div className="price-details">
            <div className="price-item">
              <span>${stay.price} x {numberOfNights} nights</span>
              <span>${stay.price * numberOfNights}</span>
            </div>
            <div className="price-item">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="price-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </section>
    </section>
  )
}
