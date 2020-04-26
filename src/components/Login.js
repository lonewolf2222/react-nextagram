import React, { useState} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl} from "react-bootstrap"
import "./Login.css"

const Login = (props) => {

    let history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const validateForm = () => {
        return username.length > 0 && password.length >0
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(username)
        //console.log(password)
        axios({
            method: 'POST',
            url: 'https://webapp.leapnet.me/api/v1/login',
            data: {
                username: username,
                password: password
            },
            headers: {'Content-Type': 'application/json'}
        })
    .then((response) => {
        //console.log(response)
        toast.success(response.data.message)
        const token=response.data.auth_token
        //console.log(token)
        localStorage.setItem('token',token)
        props.setLoggedIn(true)
        props.closeModal()
        history.push('/profile')
    })
    .catch(error => {
        console.log(error)
        toast.error(error.response.data.message)   
    })
}
      return(
          <div>
          <Form onSubmit={handleSubmit}>
              <FormGroup controlId="formBasicText" bsSize="large">
                  <Form.Label>Username</Form.Label>
                  <FormControl value={username} 
                                type="text" 
                                onChange={e => setUsername(e.target.value)}/>
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                  <Form.Label>Password</Form.Label>
                  <FormControl value={password}
                                type="password"
                                onChange={e=> setPassword(e.target.value)}/>
              </FormGroup>

              <Button block bsSize="large" type="submit" disabled={!validateForm()}>Login</Button>
          </Form>
          </div>
      )
}
export default Login