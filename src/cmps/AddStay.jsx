import React, { useState, useEffect, useRef } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addStay } from '../store/actions/stay.actions'
import { useNavigate } from 'react-router'
import {
  types,
  countries,
  cities,
  coordinates,
  amenities,
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
  LinearProgress,
} from '@mui/material'
import {
  getRandomHostImg,
  getRandomMaleName,
  makeId,
  makeLorem,
  generateRandomReviews,
  calculateAverageRating,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
} from '../services/util.service.js'

export function AddStay() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 9

  const initialCountry = countries.length > 0 ? countries[0].name : ''
  const initialCity =
    initialCountry && cities[initialCountry] ? cities[initialCountry][0] : ''
  const initialLat =
    initialCity && coordinates[initialCity] ? coordinates[initialCity].lat : ''
  const initialLng =
    initialCity && coordinates[initialCity] ? coordinates[initialCity].lng : ''

  const [name, setName] = useState('')
  const [type, setType] = useState(types.length > 0 ? types[0] : '')
  const [price, setPrice] = useState('')
  const [capacity, setCapacity] = useState('')
  const [beds, setBeds] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [baths, setBaths] = useState('')
  const [country, setCountry] = useState(initialCountry)
  const [city, setCity] = useState(initialCity)
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState(initialLat)
  const [lng, setLng] = useState(initialLng)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [selectedLabels, setSelectedLabels] = useState([])
  const [summary, setSummary] = useState('')
  const navigate = useNavigate()
  const videoRef = useRef(null)

  useEffect(() => {
    updateCityAndCoordinates()
  }, [country])

  useEffect(() => {
    updateCoordinates()
  }, [city])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [currentStep])

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
      summary,
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

  function handleNext() {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  function isNextBtnDisabled() {
    switch (currentStep) {
      case 2:
        return !type
      case 3:
        return !country || !city || !address
      case 4:
        return !capacity || !bedrooms || !baths
      case 6:
        return selectedAmenities.length === 0
      case 7:
        return !name
      case 8:
        return summary.length < 1
      case 9:
        return price < 1
      default:
        return false
    }
  }

  function renderStepContent(step) {
    switch (step) {
      case 1:
        return (
          <section className="stage-1">
            <section className="text">
              <span className="step">Step 1</span>
              <span className="question">Tell us about your place</span>
              <span className="description">
                In this step, we'll ask you which type of property you have and
                if guests will book the entire place or just a room. Then let us
                know the location and how many guests can stay.
              </span>
            </section>
            <div className="stage-video">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520620/BuildHouseVidIntro_tbrwcf.mp4"
                autoPlay
                muted
              ></video>
            </div>
          </section>
        )
      case 2:
        return (
          <section className="stage-2">
            <section className="text">
              <span className="question">
                Which of these best describes your place?
              </span>
            </section>
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
          </section>
        )
      case 3:
        return (
          <section className="stage-3">
            <section className="text">
              <span className="question">Where's your place located?</span>
              <span className="description">
                Your address is only shared with guests after they’ve made a
                reservation.
              </span>
            </section>
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
              required
            />
            <TextField
              label="Latitude"
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Longitude"
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </section>
        )
      case 4:
        return (
          <section className="stage-4">
            <section className="text">
              <span className="question">Let's start with the basics</span>
              <span className="description">
                How many guests can your place accommodate?
              </span>
            </section>
            <div>
              <TextField
                label="Guests"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Bedrooms"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Beds"
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Bathrooms"
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </div>
          </section>
        )
      case 5:
        return (
          <section className="stage-5">
            <section className="text">
              <span className="step">Step 2</span>
              <span className="question">Make your place stand out</span>
              <span className="description">
                In this step, you’ll add some of the amenities your place
                offers, plus 5 or more photos. Then, you’ll create a title and
                description.
              </span>
            </section>
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520618/BuildHouseVidMiddle_u6k0ep.mp4"
              autoPlay
              muted
            ></video>
          </section>
        )
      case 6:
        return (
          <section className="stage-6">
            <section className="text">
              <span className="question">
                Tell guests what your place has to offer
              </span>
              <span className="description">
                You can add more amenities after you publish your listing.
              </span>
              <FormControl fullWidth margin="normal">
                <InputLabel>Amenities</InputLabel>
                <Select
                  multiple
                  value={selectedAmenities}
                  onChange={handleAmenityChange}
                  renderValue={(selected) => selected.join(', ')}
                  required
                >
                  {amenities.map((amenity, index) => (
                    <MenuItem key={`${index}-${amenity}`} value={amenity}>
                      <Checkbox
                        checked={selectedAmenities.indexOf(amenity) > -1}
                      />
                      <ListItemText primary={amenity} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </section>
          </section>
        )
      case 7:
        return (
          <section className="stage-7">
            <section className="text">
              <span className="question">
                Now, let's give your place a title
              </span>
              <span className="description">
                Short titles work best. Have fun with it—you can always change
                it later
              </span>
              <TextField
                label="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <span className="counter">{name.length}/32</span>
            </section>
          </section>
        )
      case 8:
        return (
          <section className="stage-8">
            <section className="text">
              <span className="question">Create your description</span>
              <span className="description">
                Share what makes your place special.
              </span>
              <TextField
                label="Description"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <span className="counter">{summary.length}/500</span>
            </section>
          </section>
        )
      case 9:
        return (
          <section className="stage-9">
            <section className="text">
              <span className="step">Step 3</span>
              <span className="question">Finish up and publish</span>
              <span className="description">
                Finally, you’ll choose if you'd like to start with an
                experienced guest, then you'll set your nightly price. Answer a
                few quick questions and publish when you're ready.
              </span>
            </section>
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520620/BuildHouseVidOutro_qiv9vd.mp4"
              autoPlay
              muted
            ></video>
            <TextField
              label="Price $"
              placeholder="$"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </section>
        )
      default:
        return null
    }
  }

  return (
    <section className="main-add-modal">
      <div className="add-modal">
        <form onSubmit={onAddStay}>
          <LinearProgress
            variant="determinate"
            value={(currentStep / totalSteps) * 100}
          />
          {renderStepContent(currentStep)}
          <section className="progress-footer">
            <Button onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            {currentStep < totalSteps && (
              <Button onClick={handleNext} disabled={isNextBtnDisabled()}>
                Next
              </Button>
            )}
            {currentStep === totalSteps && (
              <Button
                type="submit"
                variant="contained"
                className="airbnb-btn"
                fullWidth
              >
                Publish
              </Button>
            )}
          </section>
        </form>
      </div>
    </section>
  )
}
