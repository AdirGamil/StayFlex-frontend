import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order'
import {
  socketService,
  SOCKET_EVENT_ORDER_UPDATED,
} from '../services/socket.service'
import { showSuccessMsg } from '../services/event-bus.service'

export function StayTrips() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()

    socketService.on(SOCKET_EVENT_ORDER_UPDATED, (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      )
      showSuccessMsg(
        `Your order has been ${updatedOrder.status.toLowerCase()}!`
      )
    })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    }
  }, [])

  async function loadOrders() {
    try {
      const orders = await orderService.query()
      setOrders(orders)
    } catch (err) {
      console.error('Failed to load orders:', err)
    }
  }

  function formatDateRange(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
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
          <img src={order.stay.imgUrls[0]} alt="" className="trip-img" />
          <div className="trip-info">
            <div className="trip-city">{order.stay.loc.city}</div>
            <div className="trip-title">Hosted by {order.hostId.fullname}</div>
            <div className="trip-date">
              {formatDateRange(order.startDate, order.endDate)}
            </div>
            <div className={`trip-status status-${order.status.toLowerCase()}`}>
              {order.status}
            </div>
          </div>
        </article>
      ))}
      <div className="trip-not">
        Cant find your reservation here? <span>Lets find one</span>
      </div>
    </section>
  )
}
