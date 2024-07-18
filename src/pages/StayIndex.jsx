import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay/'
import { userService } from '../services/user'

import { StayList } from '../cmps/StayList.jsx'
import { StayFilter } from '../cmps/StayFilter.jsx'

export function StayIndex() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  return (
    <main className="stay-index">
      <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <StayList stays={stays} />
    </main>
  )
}
