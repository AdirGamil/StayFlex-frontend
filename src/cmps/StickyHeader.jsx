// StickyHeader.jsx
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'

import { AppHeader } from '../cmps/AppHeader'
import { StayFilter } from '../cmps/StayFilter'
import { StayLabels } from './StayLabels'
import { stayService } from '../services/stay/'

export function StickyHeader() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())

  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  function onLabelClick(label) {
    setFilterBy({ ...filterBy, label })
  }

  return (
    <div className="sticky-header-wrapper ">
      <AppHeader />
      <div className="stay-filter-container">
        <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <StayLabels onLabelClick={onLabelClick} />
    </div>

  )
}
