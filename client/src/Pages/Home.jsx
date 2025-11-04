import React from 'react'
import NavBar from '../Components/NavBar'
import Header from '../Components/Header'
import Tasks from '../Components/Tasks'

const Home = () => {
  // console.log(localStorage.getItem('token'))
  return (
    <div>
      <NavBar/>
      <Header/>
      <Tasks/>
    </div>
  )
}

export default Home
