import React from 'react';
import {Route, Switch} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import ProfileImagePage from './pages/ProfileImagePage'
import Navbar from './components/Navbar'
import './App.css';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage'

function App() {

  return (  
<div>
      
      <Navbar/>
      <Switch>
      <Route path="/users/:id" component={UserProfilePage}/>
      <Route path="/profile" component={MyProfilePage}/>
      <Route path="/upload" component={UploadPage}/>
      <Route path="/profileimage" component={ProfileImagePage}/>
      <Route path="/" component={HomePage}/>
      </Switch>
      <ToastContainer />
</div>
  )
}

export default App;
