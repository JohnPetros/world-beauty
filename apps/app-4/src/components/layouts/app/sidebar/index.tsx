import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'

import { NavMenu } from '../navbar'

export const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 w-48 md:border-1 p-6 h-screen'>
      <div className='bg-zinc-800 rounded-md'>
        <h1 className='text-zinc-50 text-center px-3 py-2 font-bold'>World Beauty</h1>
      </div>
      <div className='mt-3'>
        <NavMenu />
      </div>
    </div>
  )
}
