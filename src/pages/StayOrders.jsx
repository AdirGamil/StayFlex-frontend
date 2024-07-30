import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order'
import { userService } from '../services/user/user.service.local' // Add this import
import {
  SOCKET_EVENT_ORDER_ADDED,
  SOCKET_EVENT_ORDER_UPDATED,
  socketService,
} from '../services/socket.service'
import { useDispatch } from 'react-redux'
import { getActionAddOrder, getActionUpdateOrder } from '../store/actions/order.actions'

export function StayOrders() {
  const [orders, setOrders] = useState([])
  const [guestDetails, setGuestDetails] = useState({}) // Add this state
  const dispatch = useDispatch()

  useEffect(() => {
    loadOrders()

    
    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
      console.log('GOT from socket', order)
      dispatch(getActionAddOrder(order))
    })

    // socketService.on(SOCKET_EVENT_ORDER_UPDATED, orderId => {
    // 	console.log('GOT from socket', orderId)
    // 	dispatch(getActionUpdateOrder(orderId))
    // })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_ADDED)
      // socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    }
  }, [])

  async function loadOrders() {
    const orders = await orderService.query()
    setOrders(orders)
    fetchGuestDetails(orders)
   
  }

  async function fetchGuestDetails(orders) {
    const details = {}
    for (let order of orders) {
      if (!details[order.guest._id]) {
        const user = await userService.getById(order.guest._id)
        details[order.guest._id] = user
      
      }
    }
    setGuestDetails(details)
  }

  async function handleStatusChange(orderId, status) {
    const updatedOrder = await orderService.getById(orderId)
    if (updatedOrder) {
      updatedOrder.status = status
      await orderService.save(updatedOrder)
   
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      )
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="stay-orders-container padding">
      <h1>Orders</h1>
      <table className="stay-orders-table padding">
        <thead>
          <tr>
            <th>Status</th>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className={`status-${order.status.toLowerCase()}`}>
                {order.status}
              </td>
              <img
                src={
                  guestDetails[order.guest._id]?.imgUrl ||
                  'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                }
                alt={guestDetails[order.guest._id]?.fullname || 'Guest'}
                className="guest-image"
              />{' '}
              <td>{formatDate(order.startDate)}</td>
              <td>{formatDate(order.endDate)}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => handleStatusChange(order._id, 'Approved')}
                  disabled={
                    order.status === 'Approved' || order.status === 'Declined'
                  }
                  className={`btn btn-accept ${
                    order.status === 'Approved' || order.status === 'Declined'
                      ? 'btn-disabled'
                      : ''
                  }`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(order._id, 'Declined')}
                  disabled={
                    order.status === 'Declined' || order.status === 'Approved'
                  }
                  className={`btn btn-reject ${
                    order.status === 'Declined' || order.status === 'Approved'
                      ? 'btn-disabled'
                      : ''
                  }`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
