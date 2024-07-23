const { DEV, VITE_LOCAL } = import.meta.env

import { makeId } from '../util.service'
import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote.js'

function getEmptyOrder({
  stay,
  guest = { _id: 'guest1', fullname: 'Guest User' },
  totalPrice = 0,
  startDate = '',
  endDate = '',
} = {}) {
  return {
    _id: makeId(),
    hostId: stay.host._id,
    guest,
    totalPrice,
    startDate,
    endDate,
    guests: {
      adults: 1,
      kids: 0,
    },
    stay: {
      _id: stay._id,
      name: stay.name,
      price: stay.price,
    },
    msgs: [],
    status: 'pending',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, ...service }

if (DEV) window.orderService = orderService
