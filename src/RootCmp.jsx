import './assets/styles/main.scss'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import { Account } from './pages/Account.jsx'
// import { Messages } from './pages/Messages.jsx'
// import { Notifications } from './pages/Notifications.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayIndex } from './pages/StayIndex.jsx'

import { UserDetails } from './pages/UserDetails.jsx'
// import { Wishlist } from './pages/Wishlist.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'


export function RootCmp() {
  // return <h2>hello from root</h2>
  return (
    <Router>
      <div className="main-container">
        <AppHeader />
        <UserMsg />

        <main>
          <Routes>
            <Route path="stay" element={<StayIndex />} />
            <Route path="stay/:stayId" element={<StayDetails />} />
            <Route path="user/:id" element={<UserDetails />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
