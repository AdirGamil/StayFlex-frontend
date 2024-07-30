const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote.js'


function getEmptyOrder({
  stay,
  guest,
  totalPrice = 0,
  startDate = '',
  endDate = '',
} = {}) {
  const loggedinUser = userService.getLoggedinUser()

  return {
    hostId: stay.host._id,
    guest: guest || {
      _id: loggedinUser?._id || 'guest1',
      fullname: loggedinUser?.fullname || 'Guest User',
    },
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
      imgUrls: stay.imgUrls || [],
      loc: stay.loc || {},
    },
    msgs: [],
    status: 'Pending',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, ...service }

if (DEV) window.orderService = orderService
