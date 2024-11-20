import React from 'react'
import '../../styles/layout.css';
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Sidebar />
        <main className='main'>
           {children}
        </main>
    </div>
  )
}

export default Layout