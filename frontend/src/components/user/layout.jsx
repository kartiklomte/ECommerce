import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from './header'

const UserLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>

        {/* user header */}
        <UserHeader/>

        <main className='flex flex-col w-full'>

            <Outlet/>
        </main>
    </div>

  )
}

export default UserLayout