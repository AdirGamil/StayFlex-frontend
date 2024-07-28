// order.service.remote.js

import { httpService } from '../http.service'

export const orderService = {
  query,
  getById,
  save,
  remove,
  addOrderMsg,
  removeOrderMsg,
}

async function query(filterBy = {}) {
  try {
    return await httpService.get('order', filterBy)
  } catch (err) {
    console.error('Error querying orders:', err.response ? err.response.data : err)
    throw err
  }
}

async function getById(orderId) {
  try {
    return await httpService.get(`order/${orderId}`)
  } catch (err) {
    console.error(`Error getting order by ID ${orderId}:`, err.response ? err.response.data : err)
    throw err
  }
}

async function remove(orderId) {
  try {
    return await httpService.delete(`order/${orderId}`)
  } catch (err) {
    console.error(`Error removing order ${orderId}:`, err.response ? err.response.data : err)
    throw err
  }
}

async function save(order) {
  let savedOrder
  console.log('Saving order:', order)

  if (order._id) {
    try {
      savedOrder = await httpService.put(`order/${order._id}`, order)
      console.log('Order updated successfully:', savedOrder)
    } catch (err) {
      console.error('Error updating order:', err.response ? err.response.data : err)
      throw err
    }
  } else {
    const loggedinUser = userService.getLoggedinUser()
    order.guest = {
      _id: loggedinUser?._id || 'guest1', // logged-in user or guest user
      fullname: loggedinUser?.fullname || 'Guest User', // logged-in user name or guest user name
    }
    order.status = 'Pending'
    order.msgs = []
    try {
      savedOrder = await httpService.post('order', order)
      console.log('Order created successfully:', savedOrder)
    } catch (err) {
      console.error('Error creating order:', err.response ? err.response.data : err)
      throw err
    }
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  const msg = {
    by: { _id: 'guest1', fullname: 'Guest User' }, // Placeholder guest info
    txt,
  }
  try {
    return await httpService.post(`order/${orderId}/msg`, msg)
  } catch (err) {
    console.error(`Error adding message to order ${orderId}:`, err.response ? err.response.data : err)
    throw err
  }
}

async function removeOrderMsg(orderId, msgId) {
  try {
    return await httpService.delete(`order/${orderId}/msg/${msgId}`)
  } catch (err) {
    console.error(`Error removing message ${msgId} from order ${orderId}:`, err.response ? err.response.data : err)
    throw err
  }
}
