  import React from 'react'
  import MessageSocket from './pages/MessageSocket'
  import { Route, Routes } from 'react-router-dom'
  import Register from './pages/Register'
  import Login from './pages/Login'
  import Logout from './pages/Logout'
  import Nav from './pages/Nav'
  import Chating from './pages/Chating'

  const App = () => {
    return (
      <>
      <Nav/>
      <Routes>
        
        <Route path='/' />
        <Route path='/chat' element={ <MessageSocket/> }>
        <Route path='/chat/:id' element={<Chating/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
      
      </Routes>
      
      </>
    )
  }

  export default App
