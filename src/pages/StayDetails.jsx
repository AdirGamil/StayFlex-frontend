import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/actions/stay.actions'
import { Map } from '../cmps/StayDetailsCmps/Map'
import { GuestFavorite } from '../cmps/StayDetailsCmps/GuestFavorie'
import { StayGallery } from '../cmps/StayDetailsCmps/StayGallery'
import { StayReservation } from '../cmps/StayDetailsCmps/StayReservation'
import { ScrollHeader } from '../cmps/StayDetailsCmps/ScrollHeader'
import {
  pluralize,
  calculateAverageRating,
  getRandomIntInclusive,
  amenityIcons,
} from '../services/util.service';

export function StayDetails() {
  const { stayId } = useParams();
  const stay = useSelector((storeState) => storeState.stayModule.stay);
  const [showScrollHeader, setShowScrollHeader] = useState(false);
  const [searchParams] = useSearchParams();
  const guestCount = JSON.parse(searchParams.get('guests') || '{}');

  const [initialStartDate, setInitialStartDate] = useState(null);
  const [initialEndDate, setInitialEndDate] = useState(null);

  useEffect(() => {
    loadStay(stayId);
  }, [stayId]);

  useEffect(() => {
    if (stay && stay.dateRange) {
      const [startDateStr, endDateStr] = stay.dateRange.split(' - ');
      setInitialStartDate(new Date(startDateStr));
      setInitialEndDate(new Date(endDateStr));
    }
  }, [stay]);

  useEffect(() => {
    const handleScroll = () => {
      const photoSection = document.querySelector('.stay-gallery');
      if (photoSection) {
        const photoSectionBottom = photoSection.getBoundingClientRect().bottom;
        setShowScrollHeader(photoSectionBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!stay) return <div>Loading...</div>;

  const averageRating = calculateAverageRating(stay.reviews);
  const reviewCount = stay.reviews ? stay.reviews.length : 0;

  return (
    <section className="stay-details main-layout">
      {showScrollHeader && (
        <ScrollHeader
          price={stay.price}
          rating={averageRating}
          reviewCount={stay.reviews.length}
        />
      )}
      <header className="stay-header main-layout">
        <h1 className="stay-title">{stay.name}</h1>
        <div className="share-save">
          <button className="share-btn">
            <img src={amenityIcons.share} alt="share-icon" />
            Share
          </button>
          <button className="save-btn">
            <img src={amenityIcons.heart} alt="heart-icon" />
            Save
          </button>
        </div>
      </header>

      <div id="photos" className="active stay-gallery">
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
                <img src={amenityIcons.star} alt="Star icon" />
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
          <GuestFavorite rating={averageRating} reviewCount={stay.reviews.length} />
            <div className="host">
              {stay.host &&
                typeof stay.host === 'object' &&
                stay.host.imgUrl && (
                  <img src={stay.host.imgUrl} alt="Host" className="host-img" />
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

          <div id="amenities" className="stay-amenities">
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
        <div className="stay-reservation">
          <StayReservation
            stay={stay}
            guestCount={guestCount}
            initialStartDate={initialStartDate}
            initialEndDate={initialEndDate}
          />
        </div>
      </section>
      <section id="reviews" className="header-reviews">
        <div className="header">★ {averageRating} · 6 reviews</div>
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
                  <p>
                    ★★★★★<span></span>
                  </p>
                  <h6>·</h6>
                  <h4>
                    July 2024 <span> Stayed a few nights</span>
                  </h4>
                </div>
                <div className="review-content">
                  <p>{review.txt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="location">
        <div className="map-container">
          <article>
            <h1>Where you'll be</h1>
            <div className="map">
              <Map stay={stay} />
            </div>
            <div className="city-info">
              {stay.loc.country} · {stay.loc.city} · {stay.loc.address}
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
