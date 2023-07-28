import React from 'react'
import Slidebar from '../components/Slidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='Home'>
        <div className='container'>
          
            <Slidebar></Slidebar>
            <Chat></Chat>
        </div>
    </div>
  )
}

export default Home