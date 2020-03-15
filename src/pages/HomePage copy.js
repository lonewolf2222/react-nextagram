import axios from 'axios'
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
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
          <div style={{display:"flex", alignItems:"stretch", paddingTop:20}}>
            <div style={{display: "flex", flexDirection:"column"}}>
                <h2> {user.username}</h2>
                <img style={{width: 200, height:200, borderRadius: 100}} src={user.profileImage}/>
                <Link to={`/users/${user.id}`}>User Profile</Link>
              </div>
            <UserImages value={user.id}/>
          </div>
        ))}
      </div>
  );
}

export default HomePage;