import React from 'react'
import Sidebar from '../../components/Sidebar'
import MainDiv from '../../components/MainDiv'
import Layout from '../../components/Layout'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <div className='flex gap-2'>
       <Sidebar />
      </div>
    </>
  )
}

export default Dashboard