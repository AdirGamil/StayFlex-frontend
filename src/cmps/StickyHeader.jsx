// StickyHeader.jsx
import { useState } from 'react'

import { AppHeader } from '../cmps/AppHeader'
import { StayFilter } from '../cmps/StayFilter'
import { StayLabels } from './StayLabels'
import { stayService } from '../services/stay/'

export function StickyHeader() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())

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
