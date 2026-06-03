import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Orders from './pages/Orders'
import Add from './pages/Add'
import List from './pages/List'
import Login from './components/Login'

const App = () => {

  const [token, setToken] = useState('');

  return (
    <div className='bg-gray-50 min-h-screen'>

      {token === "" ? <Login /> :               //if not authenticated display login page
        <>                                      //else display admin panel
          <Navbar />
          <hr className='text-gray-300' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base bg-pink-100'>
              <Routes>
                <Route path='/add' element={<Add />} />
                <Route path='/list' element={<List />} />
                <Route path='/orders' element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
