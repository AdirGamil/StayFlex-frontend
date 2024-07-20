import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"



export function StayReservation({ stay }) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    })
    const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false)
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

    function handleStartDateChange(date) {
        setStartDate(date)
    }

    function handleEndDateChange(date) {
        setEndDate(date)
    }

    function toggleGuestsDropdown() {
        setIsGuestsDropdownOpen(!isGuestsDropdownOpen);
    }

    function handleGuestsChange(type, value) {
        const newGuests = { ...guests, [type]: Math.max(0, value) };
        setGuests(newGuests);
        setFilterToEdit({ ...filterToEdit, guests: newGuests });
    }

    const calculateNumberOfNights = () => {
        if (!startDate || !endDate) return 0;
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const numberOfNights = calculateNumberOfNights();
    const subtotal = stay ? stay.price * numberOfNights : 0;
    const taxes = subtotal * 0.17; // 17% of the subtotal
    const totalPrice = subtotal + taxes;


    return (
        <div className="reservation">
            <div className="reservation-selectors">
                <div className="reservation-price">
                    <h2>${stay.price}&nbsp;</h2>
                    <span>night</span>
                </div>
            </div>

            <div className="date-picker-container">
                <div className="check-in">
                    {/* <label>Check in</label> */}
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
                    {/* <label>Check out</label> */}
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
                    {/* <span>Who</span> */}
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
                    <span>${stay.price} x {numberOfNights} nights</span>
                    <span>${stay.price * numberOfNights}</span>
                </div>
                <div className="price-item">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="price-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>)
}