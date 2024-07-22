// import './assets/styles/main.scss'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js'

// import { Account } from './pages/Account.jsx'
// import { Messages } from './pages/Messages.jsx'
// import { Notifications } from './pages/Notifications.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { ConfirmReservation } from './pages/ConfirmReservation.jsx' 
import { StayIndex } from './pages/StayIndex.jsx'

import { UserDetails } from './pages/UserDetails.jsx'
// import { Wishlist } from './pages/Wishlist.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AddStay } from './cmps/AddStay.jsx'
import { StayOrders } from './pages/StayOrders.jsx'

export function RootCmp() {
  // return <h2>hello from root</h2>
  return (
    <Provider store={store}>
      <Router>
        <div className="main-container">
          <AppHeader />
          {/* <UserMsg /> */}

          <main>
            <Routes>
              <Route path="" element={<StayIndex />} />
              <Route path="stay/:stayId" element={<StayDetails />} />
              <Route path="/confirm-reservation" element={<ConfirmReservation />} />
              <Route path="/addstay" element={<AddStay />} />
              <Route path="/orders" element={<StayOrders />} />
              <Route path="user/:id" element={<UserDetails />} />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </div>
      </Router>
    </Provider>
  )
}
