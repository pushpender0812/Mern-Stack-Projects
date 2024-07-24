import React from 'react'
import { Route,Routes } from 'react-router-dom'
import App from '../App'

const Routes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App/>}/>
      </Routes>
    </>
  )
}

export default Routes
