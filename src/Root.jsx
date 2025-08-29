import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Navbar/Footer'
import Chat from './pages/Chat'

const Root = () => {

  return <div className="root h-dvh overflow-x-hidden scrollbar-hide main-content">
    <Navbar />
    <Chat />
    <Outlet />
    <Footer />
  </div>
}

export default Root