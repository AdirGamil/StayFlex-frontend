
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ScrollHeader({ price, rating, reviewCount, stay, startDate, endDate, guests, numberOfNights, totalPrice, taxes, averageRating }) {
  const navigate = useNavigate()
  const [showHeaderInfo, setShowHeaderInfo] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const reserveButton = document.querySelector('.stay-reservation .reserve-btn')
      if (reserveButton) {
        const rect = reserveButton.getBoundingClientRect()
        const shouldShow = rect.top < 0
        // console.log('Reserve button top:', rect.top)
        // console.log('Should show header info:', shouldShow)
        setShowHeaderInfo(shouldShow)
      } else {
        // console.log('Reserve button not found')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleReserve(){
    const orderDetails = {
      hostId: {
        _id: stay.host._id,
        fullname: stay.host.fullname,
        imgUrl: stay.host.imgUrl
      },
      guest: {
        _id: 'guest1',
        fullname: 'Guest User'
      },
      totalPrice,
      taxes,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      guests: {
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        pets: guests.pets,
      },
      stay: {
        _id: stay._id,
        name: stay.name,
        price: stay.price,
        imgUrls: stay.imgUrls,
        loc: stay.loc
      },
      numberOfNights,
      msgs: [],
      status: 'pending',
      averageRating: rating,
      reviewCount,
      pricePerNight: stay.price
    }
    console.log("Attempting to navigate with:", orderDetails);
    navigate('/confirm-reservation', { state: { orderDetails } })
  }

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
  )
}