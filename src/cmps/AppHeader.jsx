// import { Link, NavLink } from 'react-router-dom'
// import logo from '../assets/img/airbnb-icon.svg'

// export function AppHeader() {
//   return (
//     <header className="app-header">
//       <nav className="nav-container">
//         <NavLink to="/" className="logo">
//           {/* <img
//             className="logo-header"
//             src="https://res.cloudinary.com/dhweqnxgd/image/upload/v1721279278/StayFlex%20App/wzb3ksekaeh5zogdfmqr.png"
//             alt="logo"
//           /> */}
//           <img className="app-logo" src={logo} alt="logo" />
//           <h1>StayFlex</h1>
//         </NavLink>
//         <div className="links-header">
//           <NavLink to="stay">Stays</NavLink>
//           <NavLink to="experiences">Experiences</NavLink>
//         </div>

//         <NavLink to="login" className="login-link">
//           Login
//         </NavLink>
//         <button> menu </button>
//       </nav>
//     </header>
//   )
// }
import React from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/img/airbnb-icon.svg'
import MenuButton from './MenuButton' // Import the MenuButton component


export function AppHeader() {
  const location = useLocation();
  const params = useParams();
  
  const isStayDetailsRoute = location.pathname.startsWith('/stay/')
  
  return (
    // <header className="app-header">
    <header className={`app-header ${isStayDetailsRoute ? 'stay-details-header' : ''}`}>
    
      <nav className="nav-container">
        <NavLink to="/" className="logo">
          <img className="app-logo" src={logo} alt="logo" />
          <h1>StayFlex</h1>
        </NavLink>
        <div className="links-header">
          <NavLink to="stay">Stays</NavLink>
          <NavLink to="experiences">Experiences</NavLink>
        </div>
        <div className="user-actions">
          {/* <NavLink to="login" className="login-link">
            Login
          </NavLink> */}
          <MenuButton />
        </div>
      </nav>
    </header>
  )
}
