import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order'

export function StayOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const orders = await orderService.query()
    setOrders(orders)
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

  return (
    <div className="stay-orders-container">
      <h1>Orders</h1>
      <table className="stay-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Guest</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.guest.fullname}</td>
              <td>{order.startDate}</td>
              <td>{order.endDate}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className={`btn btn-accept ${
                    order.status === 'Approved' || order.status === 'Declined'
                      ? 'btn-disabled'
                      : ''
                  }`}
                  onClick={() => handleStatusChange(order._id, 'Approved')}
                  disabled={
                    order.status === 'Approved' || order.status === 'Declined'
                  }
                >
                  Accept
                </button>
                <button
                  className={`btn btn-reject ${
                    order.status === 'Declined' || order.status === 'Approved'
                      ? 'btn-disabled'
                      : ''
                  }`}
                  onClick={() => handleStatusChange(order._id, 'Declined')}
                  disabled={
                    order.status === 'Declined' || order.status === 'Approved'
                  }
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
