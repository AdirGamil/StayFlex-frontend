import React from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/img/airbnb-icon.svg'
import world_icon from '../assets/img/world_icon.png'
import MenuButton from './MenuButton'
import { AddStay } from './AddStay'

export function AppHeader() {
  const location = useLocation()
  const params = useParams()

  const isStayDetailsRoute = location.pathname.startsWith('/stay/')
  // const isConfirmReservationRoute = location.pathname.startsWith('/confirm-reservation/')

  return (
    <header
      className={`app-header ${
        isStayDetailsRoute ? 'stay-details-header' : ''
      }`}
    >
      <nav className="nav-container">
        <NavLink to="/" className="logo">
          <img className="app-logo" src={logo} alt="logo" />
          <h1>StayFlex</h1>
        </NavLink>
        <div className="links-header">
          <NavLink to="/" className={'stay-header'}>
            Stays
          </NavLink>
          <NavLink to="/" className={'exp-header'}>
            Experiences
          </NavLink>
        </div>
        <div className="user-actions">
          {/* <NavLink to="login" className="login-link">
            Login
            </NavLink> */}

          <NavLink to="/addstay" className="add-stay">
            StayFlex your home
          </NavLink>
          {/* <NavLink to="/addstay" className="add-stay world-icon">
            <img className="world-icon" src={world_icon} alt="logo" />
          </NavLink> */}
          <MenuButton />
        </div>
      </nav>
    </header>
  )
}
