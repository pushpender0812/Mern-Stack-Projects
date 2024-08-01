
// import '.././assets/css/style-dark-rtl.css'
// import '.././assets/css/style-dark.css'
// import '.././assets/css/style.css'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
// import RegisterPage from './pages/RegisterPage'
import Registration from './pages/Registration'
import {BrowserRouter,Routes,Route,Navigate, useNavigate} from "react-router-dom"
import Logout from './pages/Logout'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { useAuth } from '../store/Auth'
import EditProfile from './pages/EditProfile'

import SuccessPayment from './pages/SuccessPayment'
import MyOrders from './pages/MyOrders'
import FAQ from './pages/FAQ'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'

function App() {
  
  const {user} = useAuth()

  if (!user) {
    <h1>Loading ...............</h1>
  }

  return (
   <>

   {/* <BrowserRouter> */}
   <Navbar/>
   
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Registration/>}/>
   <Route path="/logout" element={<Logout/>}/>
   <Route path="/wishlist" element={<WishList/>}/>
   <Route path="/cart" element={<Cart/>}/>
   <Route path="/checkout" element={<Checkout/>}/>
   <Route path="/edit-profile" element={<EditProfile/>}/>
   <Route path="/paymentsuccess" element={<SuccessPayment/>}/>
   <Route path="/orders" element={<MyOrders/>}/>
   <Route path="/blogs" element={<Blogs/>}/>
   <Route path="/currentblog" element={<SingleBlog/>}/>
   <Route path="/faq" element={<FAQ/>}/>
   <Route path="/*" element={<Navigate to={"/"}/>}/>
   </Routes>
   {/* </BrowserRouter> */}
   {/* <Registration/> */}
   </>
  )
}

export default App
