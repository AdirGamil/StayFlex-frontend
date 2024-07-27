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
  return httpService.get('order', filterBy)
}

function getById(orderId) {
  return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
  return httpService.delete(`order/${orderId}`)
}

async function save(order) {
  let savedOrder
  if (order._id) {
    console.log('order._id:', order._id)
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    order.guest = {
      _id: 'guest1', // Placeholder guest ID
      fullname: 'Guest User', // Placeholder guest name
    }
    order.status = 'Pending'
    order.msgs = []
    savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  const msg = {
    by: { _id: 'guest1', fullname: 'Guest User' }, // Placeholder guest info
    txt,
  }
  return await httpService.post(`order/${orderId}/msg`, msg)
}

async function removeOrderMsg(orderId, msgId) {
  return await httpService.delete(`order/${orderId}/msg/${msgId}`)
}
