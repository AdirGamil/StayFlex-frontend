import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [guests, setGuests] = useState(1)
    const guestOptions = Array.from({ length: 10 }, (_, index) => index + 1)

    // useEffect(() => {
    //     setFilterBy(filterToEdit)
    // }, [filterToEdit])

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit, setFilterBy])

    // function handleChange(ev) {
    //     const type = ev.target.type
    //     const field = ev.target.name
    //     let value
    //     switch (type) {
    //         case 'text':
    //             value = ev.target.value
    //         // break;
    //         default:
    //             break;
    //     }
    //     setFilterToEdit({ ...filterToEdit, [field]: value })
    // }

    function handleChange(ev) {
        const { name, value, type } = ev.target

        switch (type) {
            case 'text':
            case 'number':
                setFilterToEdit({ ...filterToEdit, [name]: value })
                break
            default:
                break
        }
    }

    function handleDatesChange({ startDate, endDate }) {
        setStartDate(startDate)
        setEndDate(endDate)
        setFilterToEdit({ ...filterToEdit, startDate, endDate })
    }

    function handleGuestsChange(value) {
        setGuests(value)
    }

    return (
        <section className='stay-filter'>
            <h3>Filter</h3>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Where"
                onChange={handleChange}
                required
            />
             <DatePicker
                selected={startDate}
                onChange={handleDatesChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                // showTimeSelect
                dateFormat="Pp"
            />
            <div className="guests-selector">
                <label>Guests:</label>
                <select
                    name="guests"
                    value={guests}
                    onChange={ev => handleGuestsChange(Number(ev.target.value))}
                >
                    {guestOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </section>
    )
}
