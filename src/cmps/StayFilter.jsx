import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { regions } from '../services/util.service'

export function StayFilter({ filterBy, setFilterBy }) {
  const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit, setFilterBy])

  function handleChange(ev) {
    const { name, value, type } = ev.target
    setFilterToEdit({ ...filterToEdit, [name]: value })
  }

  function handleStartDateChange(date) {
    setStartDate(date)
    setFilterToEdit({ ...filterToEdit, startDate: date })
  }

  function handleEndDateChange(date) {
    setEndDate(date)
    setFilterToEdit({ ...filterToEdit, endDate: date })
  }

  function toggleGuestsDropdown() {
    setIsGuestsDropdownOpen(!isGuestsDropdownOpen)
  }

  function handleGuestsChange(type, value) {
    const newGuests = { ...guests, [type]: Math.max(0, value) }
    setGuests(newGuests)
    setFilterToEdit({ ...filterToEdit, guests: newGuests })
  }

  function handleSearch() {
    onSearch(filterToEdit)
  }

  function toggleRegionDropdown() {
    setIsRegionDropdownOpen(!isRegionDropdownOpen)
  }

  function handleRegionSelect(region) {
    setFilterToEdit({ ...filterToEdit, txt: region.name })
    setIsRegionDropdownOpen(false)
  }

  return (
    <section className="stay-filter">
      <div className="search-item region-search">
        <span>Where</span>
        <input
          type="text"
          name="txt"
          value={filterToEdit.txt}
          placeholder="Search destinations"
          onChange={handleChange}
          onClick={toggleRegionDropdown}
          required
        />
        {isRegionDropdownOpen && (
          <div className="region-dropdown">
            <h3>Search by region</h3>
            <div className="region-grid">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="region-item"
                  onClick={() => handleRegionSelect(region)}
                >
                  <img src={region.map} alt={region.name} />
                  <span>{region.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="divider divider1"></div>
      <div className="date-picker-container">
        <div className="date-picker-wrapper">
          <label>Check in</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            monthsShown={2}
            dateFormat="dd/MM/yyyy"
            placeholderText="Add dates"
          />
        </div>
      </div>
      <div className="divider divider2"></div>
      <div className="date-picker-container">
        <div className="date-picker-wrapper">
          <label>Check out</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            monthsShown={2}
            dateFormat="dd/MM/yyyy"
            placeholderText="Add dates"
          />
        </div>
      </div>
      <div className="divider divider3"></div>
      <div className="search-container">
        <div className="guests-selector">
          <button className="guests-button" onClick={toggleGuestsDropdown}>
            <span>Who</span>
            <span>
              {guests.adults + guests.children + guests.infants + guests.pets >
              0 ? (
                <>
                  {guests.adults + guests.children}
                  {guests.adults + guests.children === 1 ? ' guest' : ' guests'}
                  {guests.infants > 0 &&
                    `, ${guests.infants} infant${
                      guests.infants > 1 ? 's' : ''
                    }`}
                  {guests.pets > 0 &&
                    `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`}
                </>
              ) : (
                'Add guests'
              )}
            </span>
          </button>
          <div
            className={`guests-dropdown ${
              isGuestsDropdownOpen ? 'active' : ''
            }`}
          >
            {[
              { type: 'adults', label: 'Adults', subLabel: 'Ages 13 or above' },
              { type: 'children', label: 'Children', subLabel: 'Ages 2-12' },
              { type: 'infants', label: 'Infants', subLabel: 'Under 2' },
              {
                type: 'pets',
                label: 'Pets',
                subLabel: 'Bringing a service animal?',
              },
            ].map(({ type, label, subLabel }) => (
              <div key={type}>
                <div className="guest-type">
                  <label>{label}</label>
                  <span>{subLabel}</span>
                </div>
                <div className="guest-counter">
                  <button
                    onClick={() => handleGuestsChange(type, guests[type] - 1)}
                    disabled={
                      guests[type] === 0 ||
                      (type === 'adults' && guests[type] === 0)
                    }
                  >
                    -
                  </button>
                  <span>{guests[type]}</span>
                  <button
                    onClick={() => handleGuestsChange(type, guests[type] + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M13 0c7.18 0 13 5.82 13 13 0 2.868-.929 5.519-2.502 7.669l7.916 7.917-2.828 2.828-7.917-7.916A12.942 12.942 0 0 1 13 26C5.82 26 0 20.18 0 13S5.82 0 13 0zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path>
          </svg>
        </button>
      </div>
    </section>
  )
}
