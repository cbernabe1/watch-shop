import React from 'react'
import LandingPage from './screens/ShopPage'
import HomePage from './screens/HomePage'
import Footer from './components/Footer'
import Header from './components/Header'
import {BrowserRouter, Routes, Route} from  'react-router-dom';
import ShopPage from './screens/ShopPage'
import ContactPage from './screens/ContactPage'
import SignupPage from './screens/SignupPage'
import LoginPage from './screens/LoginPage'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-slate-800 overflow-y-scroll no-scrollbar'>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/contacts' element={<ContactPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}


export default App