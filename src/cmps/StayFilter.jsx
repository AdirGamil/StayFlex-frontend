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
                endDateId="your_unique_end_date_id"
                onDatesChange={handleDatesChange}
                focusedInput={null}
                onFocusChange={null}
                isOutsideRange={() => false}
                displayFormat="DD/MM/YYYY"
            /> */}
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
            <div className="categories">
                <div className="symbol">
                    <img src='https://res.cloudinary.com/doahdwb2g/image/upload/v1721305438/3fb523a0-b622-4368-8142-b5e03df7549b_qut8wq.png' />
                    <p> Amazing pools</p>
                </div>
                <div className="symbol">
                    <img src="https://res.cloudinary.com/doahdwb2g/image/upload/v1721305502/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c_atgbiv.png" />
                    <p>Beachfront</p>
                </div>
                <div className="symbol">
                    <img src='https://res.cloudinary.com/doahdwb2g/image/upload/v1721305531/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6_oqqvwe.png' />
                    <p>OMG!</p>
                </div>
                <div className="symbol">
                    <img src='https://res.cloudinary.com/doahdwb2g/image/upload/v1721305554/78ba8486-6ba6-4a43-a56d-f556189193da_mbwgnf.png' />
                    <p>Mansions</p>
                </div>
            </div>
        </section>

    )
}
