import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import { NavMenu } from './navbar'

export class AppLayout extends Component {
  render() {
    return (
      <div className='flex bg-zinc-50'>
        <div className='w-48 border-1 p-6 h-screen'>
          <div className='bg-zinc-800 rounded-md'>
            <h1 className='text-zinc-50 text-center px-3 py-2 font-bold'>World Beauty</h1>
          </div>
          <div className='mt-3'>
            <NavMenu />
          </div>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    )
  }
}
