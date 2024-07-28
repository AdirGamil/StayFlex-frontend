import { storageService } from '../async-storage.service.js'
import { makeId } from '../util.service.js'

const STORAGE_KEY = 'orderDB'

export const orderService = {
  query,
  getById,
  save,
  remove,
  addOrderMsg,
}
window.os = orderService

async function query(filterBy = {}) {
  var orders = await storageService.query(STORAGE_KEY)
  // Apply filters if any are specified in filterBy
  return orders
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
  try {
    await storageService.remove(STORAGE_KEY, orderId)
  } catch (err) {
    console.log(err)
  }
}

async function save(order) {
  var savedOrder
  if (order._id) {
    const existingOrder = await storageService
      .get(STORAGE_KEY, order._id)
      .catch(() => null)
    if (existingOrder) {
      savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
      order._id = makeId()
      savedOrder = await storageService.post(STORAGE_KEY, order)
    }
  } else {
    order._id = makeId()
    const loggedinUser = userService.getLoggedinUser()
    order.guest = {
      _id: loggedinUser?._id || 'guest1',
      fullname: loggedinUser?.fullname || 'Guest User',
    }
    order.status = 'Pending'
    order.msgs = []
    savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  const order = await getById(orderId)

  const msg = {
    id: makeId(),
    by: { _id: 'guest1', fullname: 'Guest User' }, // Placeholder guest info
    txt,
  }
  order.msgs.push(msg)
  await storageService.put(STORAGE_KEY, order)

  return msg
}
