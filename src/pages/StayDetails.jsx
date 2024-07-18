{/* <Link to="/">Back to list</Link> */ }

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadStay } from '../store/actions/stay.actions'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className="stay-details main-layout">

      <section className="stay-header">

        <h1 className="stay-title">
          {stay.summary}
        </h1>

        <div className="share-save">
          <a href="">Share</a>
          <a href="">Save</a>
        </div>

      </section>

      <div className="stay-imgs">
        <img src={stay.imgUrls[0]} alt="" />
      </div>

      <section className="info-payment">

        <div className="stay-info">
          <h2>{stay.name}</h2>

          <ul className="info-list">
            <li>{stay.capacity} guests</li>
            <li>4 bedrooms</li>
            <li>4 beds</li>
            <li>2 baths</li>
          </ul>

        </div>


        <div className="payment">
          hello
        </div>
      </section>
    </section>
  )
}