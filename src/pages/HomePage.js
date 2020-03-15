import axios from 'axios'
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import UserImages from '../containers/UserImages'

const HomePage = () => {

const [users, setUsers] = useState([])
  useEffect(() => {
    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      setUsers(result.data)
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }, [])

  return (
      <div>
        {users.map(user => (
          <div style={{display:"flex", paddingTop:20}}>
            <div style={{display: "flex", flexDirection:"column", marginLeft:20, paddingTop:30}}>
                <Card style={{backgroundColor: "cyan" , borderStyle:"none", width: "12rem"}}>
                <Card.Img variant="top" src={user.profileImage} />
                <Card.Body>
                  <Card.Title style={{textJustify:"center", color:"white"}}> {user.username}</Card.Title>
                  <Button href={`/users/${user.id}`}>View {user.username}'s Photos</Button>
                </Card.Body>
                </Card>
              </div>
            <UserImages value={user.id}/>
          </div>
        ))}
      </div>
  );
}

export default HomePage;