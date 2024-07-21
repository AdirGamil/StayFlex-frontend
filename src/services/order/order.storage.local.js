import { storageService } from '../async-storage.service'
import { makeId } from '../util.service.js'

const ORDER_DB = 'orderDB'

export const orderService = {
    saveOrder,
    getOrders
}

async function saveOrder(order) {
    try {
        let orders = await storageService.query(ORDER_DB)
        orders.push(order)
        await storageService.post(ORDER_DB, order)
        return order
    } catch (err) {
        console.error('Error saving order:', err)
    }
}

async function getOrders() {
    try {
        return await storageService.query(ORDER_DB)
    } catch (err) {
        console.error('Error getting orders:', err)
    }
}
