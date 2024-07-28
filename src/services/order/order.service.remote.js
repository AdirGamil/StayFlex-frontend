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
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    const loggedinUser = userService.getLoggedinUser()
    order.guest = {
      _id: loggedinUser?._id || 'guest1', // משתמש המחובר או משתמש אורח
      fullname: loggedinUser?.fullname || 'Guest User', // שם משתמש המחובר או שם משתמש אורח
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
