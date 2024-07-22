import { useLocation, useNavigate } from 'react-router-dom'
import { orderService } from '../services/order/order.service.local.js'

export function ConfirmReservation() {
    const location = useLocation()
    const navigate = useNavigate()
    const { orderDetails } = location.state || {}

    async function handleConfirm() {
        try {
            const existingOrders = await orderService.query()
            const isConflict = existingOrders.some(order => 
                order.stay._id === orderDetails.stay._id &&
                (
                    (new Date(order.startDate) <= new Date(orderDetails.endDate) && new Date(order.startDate) >= new Date(orderDetails.startDate)) ||
                    (new Date(order.endDate) >= new Date(orderDetails.startDate) && new Date(order.endDate) <= new Date(orderDetails.endDate))
                )
            )

            if (isConflict) {
                alert('This stay is already reserved for the selected dates.')
                return
            }

            await orderService.save(orderDetails)
            alert('Reservation placed successfully!')
            navigate('/') // Navigate to another page after reservation
        } catch (err) {
            console.error('Error placing reservation:', err)
        }
    }

    if (!orderDetails) return <div>No reservation details found.</div>

    return (
        <div>
            <h2>Confirm Reservation</h2>
            <p>Stay: {orderDetails.stay.name}</p>
            <p>Total Price: ${orderDetails.totalPrice.toLocaleString()}</p>
            <p>Check-in: {orderDetails.startDate}</p>
            <p>Check-out: {orderDetails.endDate}</p>
            <button onClick={handleConfirm}>Confirm Reservation</button>
        </div>
    )
}
