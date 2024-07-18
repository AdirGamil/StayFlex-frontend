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
    <section className="stay-details">
      <h1>Stay Details</h1>
      <section className="stay-header">
        <div className="stay-title">
          {stay.name}
        </div>
        <div className="share-save">
          Share
          Save
        </div>
      </section>
      <div className="stay-imgs">
        <img src={stay.imgUrls[0]} alt="" />
      </div>
      {/* <Link to="/">Back to list</Link> */}



    </section>
  )
}