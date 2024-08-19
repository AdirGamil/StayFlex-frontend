import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay/'
import { StayList } from '../cmps/StayList.jsx'

export function StayIndex() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  return (
    <main className="stay-index">
      <div className="filter-container"></div>

      <StayList stays={stays} />
    </main>
  )
}
