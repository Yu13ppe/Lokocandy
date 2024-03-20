import React from 'react'
import { NavBar } from '../Components/NavBar'
import { SideBar } from '../Components/SideBar'

function Home() {
  return (
    <div className='Content'>
      <SideBar />
      <div className='list-product'>
        <NavBar />
        <h1>Home</h1>

      </div>
    </div>
  )
}

export { Home }