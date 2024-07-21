import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { addStay } from '../store/actions/stay.actions'
import { useNavigate } from 'react-router'

export function AddStay() {
  const [price, setPrice] = useState('')
  const navigate = useNavigate()

  async function onAddStay(event) {
    event.preventDefault()
    const stay = stayService.getEmptyStay({ price: +price })
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
        <h1>Airbnb your home!</h1>
        <form onSubmit={onAddStay}>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Stay</button>
        </form>
      </div>
    </section>
  )
}
