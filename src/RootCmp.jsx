import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js'

import { StayDetails } from './pages/StayDetails.jsx'
import { ConfirmReservation } from './pages/ConfirmReservation.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StickyHeader } from './cmps/StickyHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AddStay } from './cmps/AddStay.jsx'
import { StayOrders } from './pages/StayOrders.jsx'
import { MiniFilter } from './cmps/MiniFilter.jsx'

function HeaderWrapper() {
  const location = useLocation()

  return location.pathname === '/' ? <StickyHeader /> : <AppHeader />
}

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main-container">
          <HeaderWrapper />
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
          <AppFooter />
        </div>
      </Router>
    </Provider>
  )
}