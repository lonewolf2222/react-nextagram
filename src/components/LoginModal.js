import React, {useState} from 'react';
import Login from './Login'
import SignUp from './SignUp'
import { useHistory } from 'react-router-dom'

const LoginModal = () => {

  let history = useHistory()
  const[modalOpen, changeModalState] = useState(false)
  const[isLogin, changeForm] = useState(true)
  

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null)
  
  const modalStyle = {
    display: modalOpen ? "block" : "none",
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    color: 'white',
  }
  
  const buttonClick1 = () => {
    changeModalState(!modalOpen)
    changeForm(true)
  }

  const buttonClick2 = () => {
    changeModalState(!modalOpen)
    changeForm(false)
  }

  const toLogin = () => {
    changeForm(true)
  }

const toSignUp = () => {
  changeForm(false)
}

const closeModal = () => {
  changeModalState(false)
}
const logOut = () => {
  localStorage.removeItem('token')
  setLoggedIn()
  history.push('/')
}
const toProfile = () => {
  history.push('/profile')
}

const toUpload =() =>{
  history.push('/upload')
}
return (
  <>
      { loggedIn?
                <>
                <button onClick={toUpload}>Upload Photos</button>
                <button onClick={toProfile}>My Profile</button>
                <button onClick={logOut}>Log Out </button>
                </>
              : <>
                <button onClick={buttonClick1}>Login</button>
                <button onClick={buttonClick2}>Sign Up</button>
              </>
      }
      <div style={modalStyle}>
        {
          isLogin ? 
          <div style={{width: '50%', margin: 'auto', color: 'black', 'backgroundColor': 'white'}}>
            <button onClick={closeModal}>X</button>
            <Login setLoggedIn={setLoggedIn} closeModal={closeModal}/> 
            <button onClick={toSignUp}>Sign Up></button>
          </div>
          : 
          <div style={{width: '50%', margin: 'auto', color: 'black', 'backgroundColor': 'white'}}>
            <button onClick={closeModal}>X</button>
            <SignUp toLogin={toLogin}/>
            <button onClick={toLogin}>Login</button>
          </div>
        }
      }
      </div>
    </>

)
}
export default LoginModal