import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addStay, loadStays } from '../store/actions/stay.actions.js'

// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay/'
// import { userService } from '../services/user'

import { StayList } from '../cmps/StayList.jsx'
// import { StayFilter } from '../cmps/StayFilter.jsx'
// import { StayLabels } from '../cmps/StayLabels.jsx'
// import { MiniFilter } from '../cmps/MiniFilter.jsx'

export function StayIndex() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
  const [showMiniFilter, setShowMiniFilter] = useState(false)
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY
  //     if (scrollPosition > 100) {
  //       // Adjust this value as needed
  //       setShowMiniFilter(true)
  //     } else {
  //       setShowMiniFilter(false)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  // function onLabelClick(label) {
  //   setFilterBy({ ...filterBy, label })
  // }

  return (
    <main className="stay-index">
      <div className="filter-container">
      </div>
      {/* <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <StayLabels onLabelClick={onLabelClick} /> */}
      <StayList stays={stays} />
    </main>
  )
}

