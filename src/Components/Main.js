import React from 'react'
import { NavBar } from './NavBar'
import { SideBar } from './SideBar'

function Main() {
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

export { Main }