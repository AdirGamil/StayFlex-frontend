import React, { useState, useEffect } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { addStay } from '../store/actions/stay.actions'
import { useNavigate } from 'react-router'
import {
  types,
  countries,
  cities,
  coordinates,
  amenities,
  labels,
  imgUrls,
} from '../services/data.service.js'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Button,
  Select,
  TextField,
} from '@mui/material'
import {
  getRandomHostImg,
  getRandomMaleName,
  makeId,
  getRandomElement,
  getRandomIntInclusive,
  makeLorem,
  generateRandomReviews,
  calculateAverageRating,
  getRandomImgUrls,
  getRandomLabels,
  getRandomLocation,
  getRandomKilometersAway,
  getDateRange,
} from '../services/util.service.js'

export function AddStay() {
  const [name, setName] = useState('')
  const [type, setType] = useState(types[0])
  const [price, setPrice] = useState('')
  const [capacity, setCapacity] = useState('')
  const [beds, setBeds] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [baths, setBaths] = useState('')
  const [country, setCountry] = useState(countries[0].name)
  const [city, setCity] = useState(cities[countries[0].name][0])
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState(coordinates[cities[countries[0].name][0]].lat)
  const [lng, setLng] = useState(coordinates[cities[countries[0].name][0]].lng)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [selectedLabels, setSelectedLabels] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    updateCityAndCoordinates()
  }, [country])

  useEffect(() => {
    updateCoordinates()
  }, [city])

  function updateCityAndCoordinates() {
    const newCity = cities[country][0]
    setCity(newCity)
    setLat(coordinates[newCity].lat)
    setLng(coordinates[newCity].lng)
  }

  function updateCoordinates() {
    setLat(coordinates[city].lat)
    setLng(coordinates[city].lng)
  }

  function handleAmenityChange(event) {
    const {
      target: { value },
    } = event
    setSelectedAmenities(typeof value === 'string' ? value.split(',') : value)
  }

  function handleLabelChange(event) {
    const {
      target: { value },
    } = event
    setSelectedLabels(typeof value === 'string' ? value.split(',') : value)
  }

  async function onAddStay(event) {
    event.preventDefault()

    const reviews = generateRandomReviews(5)
    const averageRating = calculateAverageRating(reviews)

    const stay = {
      name,
      type,
      imgUrls: getRandomImgUrls(),
      price: +price,
      summary: makeLorem(50),
      capacity: +capacity,
      bedrooms: +bedrooms,
      baths: +baths,
      beds: +beds,
      amenities: selectedAmenities,
      labels: selectedLabels,
      loc: {
        country,
        city,
        address,
        lat: +lat,
        lng: +lng,
      },
      reviews,
      kilometersAway: getRandomKilometersAway(),
      dateRange: getDateRange(),
      likedByUsers: ['mini-user'],
      owner: userService.getLoggedinUser(),
      host: {
        _id: makeId(),
        fullname: getRandomMaleName(),
        imgUrl: getRandomHostImg(),
      },
      averageRating,
    }

    try {
      const savedStay = await addStay(stay)
      navigate('/')
      showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    } catch (err) {
      showErrorMsg('Cannot add stay')
      console.error('Cannot add stay', err)
    }
  }

  return (
    <section className="main-add-modal">
      <div className="add-modal">
        <h1>StayFlex your home!</h1>
        <form onSubmit={onAddStay}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Baths"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Beds"
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              {cities[country]?.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Latitude"
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Longitude"
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={selectedAmenities}
              onChange={handleAmenityChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {amenities.map((amenity, index) => (
                <MenuItem key={`${index}-${amenity}`} value={amenity}>
                  <Checkbox checked={selectedAmenities.indexOf(amenity) > -1} />
                  <ListItemText primary={amenity} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Labels</InputLabel>
            <Select
              multiple
              value={selectedLabels}
              onChange={handleLabelChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {labels.map((label, index) => (
                <MenuItem key={`${index}-${label}`} value={label}>
                  <Checkbox checked={selectedLabels.indexOf(label) > -1} />
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            className="airbnb-btn"
            fullWidth
          >
            Add Stay
          </Button>
        </form>
      </div>
    </section>
  )
}
