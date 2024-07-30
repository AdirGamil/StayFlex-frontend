// import React, { useEffect, useState } from 'react'
// import { orderService } from '../services/order'
// import { NavLink } from 'react-router-dom'


// export function StayTrips() {
//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     loadOrders()
//   }, [])

//   async function loadOrders() {
//     const orders = await orderService.query()
//     setOrders(orders)
//   }

//   return (
//     <section className="stay-trip-container">
//       <h1>Trips</h1>
//       {orders.map((order) => (
//         <article key={order._id} className="stay-trip">
//           {console.log(order)}
//           <img src={order.stay.imgUrls[0]} alt="" className="trip-img" />
//           <div>
//             <div className="trip-city">{order.stay.loc.city}</div>
//             <div className="trip-title">Hosted by {order.hostId.fullname}</div>
//             <div className="trip-date">Start Date: {order.startDate}</div>
//             <div className="trip-date">End Date: {order.endDate}</div>
//             <div className="trip-status">{order.status}</div>
//           </div>
//         </article>
//       ))}
//       <div className="trip-not"> Cant find your reservation here? <span> Lets find one </span>
//       </div>
//     </section>
//   )
// }

import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order'
import { NavLink } from 'react-router-dom'

export function StayTrips() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const orders = await orderService.query()
    setOrders(orders)
  }

  function formatDateRange(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const monthName = months[start.getMonth()]
    const startDay = start.getDate()
    const endDay = end.getDate()
    const year = start.getFullYear()
    return `${monthName} ${startDay}-${endDay}, ${year}`
  }
  return (
    <section className="stay-trip-container padding">
      <h1>Trips</h1>
      {orders.map((order) => (
        <article key={order._id} className="stay-trip">
          {console.log(order)}
          <img src={order.stay.imgUrls[0]} alt="" className="trip-img" />
          <div className="trip-info">
            <div className="trip-city">{order.stay.loc.city}</div>
            <div className="trip-title">Hosted by {order.hostId.fullname}</div>
            <div className="trip-date">
              {formatDateRange(order.startDate, order.endDate)}
            </div>
            <div className="trip-status">{order.status}</div>
          </div>
        </article>
      ))}
      <div className="trip-not">
        {' '}
        Cant find your reservation here? <span> Lets find one </span>
      </div>
    </section>
  )
}

