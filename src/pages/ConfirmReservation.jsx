import { useLocation, useNavigate } from 'react-router-dom'
import { orderService } from '../services/order'
import { formatDateRange, pluralize } from '../services/util.service.js'
const starIcon =
  'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png'

export function ConfirmReservation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderDetails, stay } = location.state || {}

  async function handleConfirm() {
    try {
      const existingOrders = await orderService.query()
      const isConflict = existingOrders.some(
        (order) =>
          order.stay._id === orderDetails.stay._id &&
          ((new Date(order.startDate) <= new Date(orderDetails.endDate) &&
            new Date(order.startDate) >= new Date(orderDetails.startDate)) ||
            (new Date(order.endDate) >= new Date(orderDetails.startDate) &&
              new Date(order.endDate) <= new Date(orderDetails.endDate)))
      )

      if (isConflict) {
        return
      }
      await orderService.save(orderDetails)
      navigate('/trips')
    } catch (err) {
      console.error('Error placing reservation:', err)
    }
  }

  if (!orderDetails) return <div>Loading reservation details...</div>

  // Adjust dates by adding 1 day
  const adjustedStartDate = new Date(orderDetails.startDate)
  adjustedStartDate.setDate(adjustedStartDate.getDate() + 1)
  const adjustedEndDate = new Date(orderDetails.endDate)
  adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)

  const formattedDateRange = formatDateRange(
    adjustedStartDate.toISOString().split('T')[0],
    adjustedEndDate.toISOString().split('T')[0]
  )

  return (
    <main className="main-reservation">
      <section className="reservation-section">
        <header className="title-reservation">
          <h1>Confirm and pay</h1>
        </header>

        <article className="info-reservation">
          <h2>Your trip</h2>
          <div className="dates-reservation">
            <h4>Dates</h4>
            <p>{formattedDateRange}</p>
          </div>
          <div className="guests-reservation">
            <h4>Guests</h4>
            <p>
              {orderDetails.guests.adults + orderDetails.guests.children} guests
              {orderDetails.guests.infants > 0 &&
                `, ${orderDetails.guests.infants} infant${orderDetails.guests.infants > 1 ? 's' : ''
                }`}
              {orderDetails.guests.pets > 0 &&
                `, ${orderDetails.guests.pets} pet${orderDetails.guests.pets > 1 ? 's' : ''
                }`}
            </p>
          </div>
          <div className="pay-reservation">
            <div className="pay-with">
              <h2>Pay with</h2>
              <div className="pay-imgs">
                <img
                  src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                  alt="Visa Card"
                  aria-hidden="true"
                />
                <img
                  src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
                  alt="American Express Card"
                  aria-hidden="true"
                />
                <img
                  src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                  alt="Mastercard"
                  aria-hidden="true"
                />
                <img
                  src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
                  alt="Google Pay"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="payment-form">
              <div className="form-group">
                <select id="card-type" defaultValue="">
                  <option value="" disabled> Credit or debit card</option>
                  <option value="Credit">Credit card</option>
                  <option value="Debit">Debit card</option>
                </select>
              </div>
              <div className="form-group">
                <input value="5555621859874580" type="text" placeholder="Card number" />
              </div>
              <div className="form-group split">
                <input value="02/28" type="text" placeholder="Expiration" />
                <input value="235" type="text" placeholder="CVV" />
              </div>

              <div className="form-group">
                <input value="4532856" type="text" placeholder="ZIP code" />
              </div>
              <div className="form-group">
                <select id="country" defaultValue="">
                  <option value="" disabled>Country/region</option>
                  <option value="israel">Israel</option>
                  {/* Add more country options as needed */}
                </select>
              </div>
            </div>
          </div>

          <div className="cancel-reservation">
            <h2>Cancellation policy</h2>
            <p>
              This reservation is non-refundable. <span>Learn more</span>
            </p>
          </div>

          <div className="groud-rules-reservation">
            <h2>Ground rules</h2>
            <p>
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul className="rules">
              <li>Follow the house rules</li>
              <li>Treat your Host’s home like your own</li>
            </ul>
          </div>

          <div className="agree-rules-res">
            <p>
              By selecting the button below, I agree to the{' '}
              <span>Host's House Rules</span>,{' '}
              <span>Ground rules for guests</span>,{' '}
              <span>StayFlex's Rebooking and Refund Policy</span>, and that
              StayFlex can <span>charge my payment method</span> if I’m
              responsible for damage. I agree to pay the total amount shown if
              the Host accepts my booking request.
            </p>
          </div>

          <button onClick={handleConfirm} className="reserve-btn">
            Request to book
          </button>
        </article>
      </section>

      <div className="payment-modal">
        <div className="stay-details">
          <img
            className="stay-image"
            src={orderDetails.stay.imgUrls[0]}
            alt="img of stay"
          />

          <div className="text-details">
            <h4 className="stay-name">{orderDetails.stay.name}</h4>
            <p className="stay-type">{orderDetails.stay.type}</p>
            <p className="rating">
              <img className="star-icon" src={starIcon} alt="star icon" />
              {orderDetails.averageRating}
            </p>
          </div>
        </div>
        <div className="price-details">
          <h2>Price details</h2>
          {orderDetails && orderDetails.stay && (
            <div className="price-item">
              <span className="calc-span">
                $
                {orderDetails.stay.price
                  ? orderDetails.stay.price.toLocaleString()
                  : '0'}{' '}
                x {orderDetails.numberOfNights || 0} nights
              </span>
              <span>
                $
                {orderDetails.stay.price && orderDetails.numberOfNights
                  ? (
                    orderDetails.stay.price * orderDetails.numberOfNights
                  ).toFixed(2)
                  : '0'}
              </span>
            </div>
          )}
          {orderDetails && orderDetails.taxes !== undefined && (
            <div className="price-item">
              <span className="taxes-span">Taxes</span>
              <span>${orderDetails?.taxes?.toFixed(2) || '0.00'}</span>
            </div>
          )}
          {orderDetails && orderDetails.totalPrice !== undefined && (
            <div className="price-total">
              <span>Total</span>
              <span>
                $
                {typeof orderDetails.totalPrice === 'number'
                  ? orderDetails.totalPrice.toFixed(2)
                  : '0.00'}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
