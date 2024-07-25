import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'

import { AppHeader } from '../cmps/AppHeader'
import { StayFilter } from '../cmps/StayFilter'
import { StayLabels } from './StayLabels'
import { stayService } from '../services/stay/'

export function StickyHeader() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
  const [isScrolled, setIsScrolled] = useState(false)
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const headerRef = useRef(null)

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function onLabelClick(label) {
    setFilterBy({ ...filterBy, label })
  }

  return (
    <div ref={headerRef} className={`sticky-header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <AppHeader isScrolled={isScrolled} />
      <div className={`stay-filter-container ${isScrolled ? 'hidden' : ''}`}>
        <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <StayLabels onLabelClick={onLabelClick} />
    </div>
  )
}