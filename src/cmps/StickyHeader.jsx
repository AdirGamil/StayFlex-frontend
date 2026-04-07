import { useState, useEffect, useRef } from 'react';
import { loadStays } from '../store/actions/stay.actions.js';

import { AppHeader } from '../cmps/AppHeader';
import { StayFilter } from '../cmps/StayFilter';
import { StayLabels } from './StayLabels';
import { stayService } from '../services/stay/';

const NARROW_QUERY = '(max-width: 599px)';

export function StickyHeader() {
  const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter());
  const [scrollPosition, setScrollPosition] = useState(0);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up'); // 'up' or 'down'
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW_QUERY).matches
  );
  const headerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = () => setIsNarrow(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollDirection(previousScrollPosition > currentScrollPosition ? 'up' : 'down');
      setPreviousScrollPosition(currentScrollPosition);
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [previousScrollPosition]);

  function onLabelClick(label) {
    setFilterBy({ ...filterBy, label });
  }

  function handleSearch(filters) {
    setFilterBy(filters);
  }

  const filterStyle = isNarrow
    ? {}
    : {
        transform:
          scrollDirection === 'up'
            ? `scale(${Math.max(0.43, 1 - scrollPosition / 300)}) translateY(${-Math.min(103, scrollPosition / 2)}px)`
            : `scale(0.43) translateY(-103px)`,
        opacity: scrollDirection === 'up' ? Math.max(0, 1 - scrollPosition / 100) : 0,
        transition: 'transform 0.6s, opacity 0.6s',
      };

  return (
    <div ref={headerRef} className={`sticky-header-wrapper ${scrollPosition > 0 ? 'scrolled' : ''}`}>
      <AppHeader isScrolled={scrollPosition > 0} />
      <div className="stay-filter-container" style={filterStyle}>
        <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} onSearch={handleSearch} />
      </div>
      <StayLabels onLabelClick={onLabelClick} />
    </div>
  );
}
