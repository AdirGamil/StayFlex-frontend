import { useLocation, useNavigate } from 'react-router-dom'
import { orderService } from '../services/order/order.service.local.js'
import { formatDateRange } from '../services/util.service.js'

export function ConfirmReservation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderDetails } = location.state || {}

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
        alert('This stay is already reserved for the selected dates.')
        return
      }

      await orderService.save(orderDetails)
      alert('Reservation placed successfully!')
      navigate('/') // Navigate to another page after reservation
    } catch (err) {
      console.error('Error placing reservation:', err)
    }
  }

  if (!orderDetails) return <div>No reservation details found.</div>

  const formattedDateRange = formatDateRange(
    orderDetails.startDate,
    orderDetails.endDate
  )

  return (
    <main className="main-reservation">
      <header className="title-reservation">
        <h1>Request to book</h1>
      </header>

      <article className="info-reservation">
        <h2>Your trip</h2>
        <div className="dates-reservation">
          <h4>Dates</h4>
          <p>{formattedDateRange}</p>
        </div>
        <div className="guests-reservation">
          <h4>Guests</h4>
          <p>{orderDetails.totalPrice} guest</p>
        </div>

        <div className="pay-reservation">
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
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="card">Credit or debit card</label>
              <input type="text" id="card" placeholder="Credit or debit card" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="5977 8856 5733 4825" />
            </div>
            <div className="form-group small-group">
              <input type="text" placeholder="11/26" />
              <input type="text" placeholder="244" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Morty Smith" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Israel" />
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
            We ask every guest to remember a few simple things about what makes
            a great guest.
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
            <span>Airbnb's Rebooking and Refund Policy</span>, and that Airbnb
            can <span>charge my payment method</span> if I’m responsible for
            damage. I agree to pay the total amount shown if the Host accepts my
            booking request.
          </p>
        </div>

        <button onClick={handleConfirm} className="reserve-btn">
          Request to book
        </button>
      </article>
    </main>
  )
}

// <main className="confirm-reservation">
//   <header>
//     <h1>Request to book</h1>
//   </header>
//   <article className="reservation-details">
//     <h2>Your trip</h2>
//     <div className="dates">
//       <div>
//         <h4>Dates</h4>
//         <p>{formattedDateRange}</p>{' '}
//         {/* Use the formatted date range here */}
//       </div>
//     </div>
//     <p>Stay: {orderDetails.stay.name}</p>
//     <p>Total Price: ${orderDetails.totalPrice.toLocaleString()}</p>
// <button onClick={handleConfirm} className="reserve-btn">
//   Request to book
// </button>
//   </article>
// </main>
