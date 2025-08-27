import React from 'react'
import Banner from '../components/Home/Banner'
import Books from '../components/Home/Books'

const Home = () => {
  return (
    <>
      <div className=' px-6 md:px-8 xl:px-26 pt-24 md:pt-58 xl:pt-40 z-10  '>
        <Banner />
        <Books />
      </div>
    </>
  )
}

export default Home