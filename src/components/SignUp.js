import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Form, FormGroup, Input, Label, FormText, FormFeedback } from 'reactstrap';
import { Button } from "react-bootstrap"

const SignUp = (props) => {
    
    const [delay, setDelay] = useState(null)
    const [usernameValid, setUsernameValid] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [email, setEmail] = useState('')

    const validateForm =() =>{
        return (username.length > 0) && (password.length >0) && (password === confirmpassword)
    }

    const checkUsername = newUsername =>{
        axios.get(`https://nextagram-lonewolf2222.herokuapp.com/api/v1/users/check_name?username=${newUsername}`)
        .then(response => {
            console.log(response.data)
            if (response.data.valid){
                setUsernameValid(true)
            }else {
                setUsernameValid(false)
            }
        })
    }
    const handleUsernameInput = e => {
        clearTimeout (delay)
        const newUsername = e.target.value
        setUsername(newUsername)

        const newDelay = setTimeout(() =>{
            checkUsername(newUsername)
        }, 500)

        setDelay(newDelay)
    }
    const getInputProp =() => {
        if (!username.length){
            return null
        }

        if (username.length <= 6){
            return {invalid: true}
        }

        if (usernameValid) {
            return {valid: true}
        } else {
            return {invalid: true}
        }
    }

    const getFormFeedback = () =>{
        if (!username.length){
            return null
        }
        if (username.length <= 6){
            return<FormFeedback invalid>Must be at least 6 characters</FormFeedback>
        }
        if (usernameValid){
            return<FormFeedback valid>This username is available</FormFeedback>
        } else {
            return <FormFeedback invalid>Username already taken</FormFeedback>
        }
    }
    const handleSubmit = (e) => {

        e.preventDefault(props)
        
        axios({
                method: 'POST',
                url: 'https://nextagram-lonewolf2222.herokuapp.com/api/v1/users',
                data: {
                    username: username,
                    email: email,
                    password: password
                },
                headers: {'Content-Type': 'application/json'}
            })
        .then((response) => {
            //console.log(response.data)
            const successMsg = response.data.message
            toast(successMsg)
            props.toLogin()
        })
        .catch(error => {
            //console.log(error)
            const errorMsgs = error.response.data.message
            //console.log(errorMsgs)
            errorMsgs.forEach(errorMsg => toast(errorMsg))
        })
    }

    return(
        <div>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label> Username </Label>
                <Input type="text" value={username} 
                onChange={handleUsernameInput}
                {...getInputProp()}/>
                {getFormFeedback()}
            <FormText>Enter a username between 6 and 20 characters</FormText>
        </FormGroup>

        <FormGroup>
                <Label> Email </Label>
                <Input type="email" value={email}
                onChange={e => setEmail(e.target.value)}/>
        </FormGroup>  
        
        <FormGroup>
            <Label> Password </Label>
            <Input type="password" value={password}
                onChange={e => setPassword(e.target.value)}/>
        </FormGroup>

        <FormGroup> 
            <Label> Confirm Password </Label>
            <Input type="password" value={confirmpassword}
                onChange={e => setConfirmpassword(e.target.value)}/>
        </FormGroup>

            <Button block bsSize="large" type="submit" disabled={!validateForm()}>Submit</Button>
        
        </Form>
        </div>
    )
}
export default SignUp