import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export function StayReservation({ stay }) {
    // Function to generate a random date between start and end dates
    const getRandomDate = (start, end) => {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        return date
    }

    // Initial random start date within the next 30 days
    const initialStartDate = getRandomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // Change 1
    // Initial random end date 1-5 days after the start date
    const initialEndDate = new Date(initialStartDate) // Change 2
    initialEndDate.setDate(initialStartDate.getDate() + Math.floor(Math.random() * 5) + 1) // Change 3

    // Set initial state with random dates
    const [startDate, setStartDate] = useState(initialStartDate) // Change 4
    const [endDate, setEndDate] = useState(initialEndDate) // Change 5
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    })
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false)

    function handleStartDateChange(date) {
        setStartDate(date)
    }

    function handleEndDateChange(date) {
        setEndDate(date)
    }

    function toggleGuestsDropdown() {
        setIsGuestsDropdownOpen(!isGuestsDropdownOpen)
    }

    function handleGuestsChange(type, value) {
        const newGuests = { ...guests, [type]: Math.max(0, value) }
        setGuests(newGuests)
    }

    const calculateNumberOfNights = () => {
        if (!startDate || !endDate) return 0
        const timeDiff = endDate.getTime() - startDate.getTime()
        return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }

    const numberOfNights = calculateNumberOfNights()
    const subtotal = stay ? stay.price * numberOfNights : 0
    const taxes = subtotal * 0.17 // 17% of the subtotal
    const totalPrice = subtotal + taxes

    return (
        <div className="reservation">
            <div className="reservation-selectors">
                <div className="reservation-price">
                    <h3>${stay.price.toLocaleString()}&nbsp;</h3>
                    <span>night</span>
                </div>
            </div>

            <div className="date-picker-container">
                <div className="check-in">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={2}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="CHECK-IN"
                    />
                </div>
                <div className="check-out">
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        monthsShown={2}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="CHECKOUT"
                    />
                </div>
            </div>

            <div className="guests-selector">
                <button className="guests-button" onClick={toggleGuestsDropdown}>
                    <span>
                        {guests.adults + guests.children} guests
                        {guests.infants > 0 && `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`}
                        {guests.pets > 0 && `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`}
                    </span>
                </button>
                <div className={`guests-dropdown ${isGuestsDropdownOpen ? 'active' : ''}`}>
                    {[
                        { type: 'adults', label: 'Adults', subLabel: 'Ages 13 or above' },
                        { type: 'children', label: 'Children', subLabel: 'Ages 2-12' },
                        { type: 'infants', label: 'Infants', subLabel: 'Under 2' },
                        { type: 'pets', label: 'Pets', subLabel: 'Bringing a service animal?' },
                    ].map(({ type, label, subLabel }) => (
                        <div key={type}>
                            <div className="guest-type">
                                <label>{label}</label>
                                <span>{subLabel}</span>
                            </div>
                            <div className="guest-counter">
                                <button
                                    onClick={() => handleGuestsChange(type, guests[type] - 1)}
                                    disabled={guests[type] === 0 || (type === 'adults' && guests[type] === 1)}
                                >
                                    -
                                </button>
                                <span>{guests[type]}</span>
                                <button onClick={() => handleGuestsChange(type, guests[type] + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="reserve-btn">Reserve</button>
            <p className="charged-p">You won't be charged yet</p>

            <div className="price-details">
                <div className="price-item">
                    <span className="calc-span">${stay.price.toLocaleString()} x {numberOfNights} nights</span>
                    <span>${(stay.price * numberOfNights).toLocaleString()}</span>
                </div>
                <div className="price-item">
                    <span className="taxes-span">Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="price-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
