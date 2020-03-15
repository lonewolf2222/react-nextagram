import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../components/Loader'

const MyProfilePage = () =>{

    let history = useHistory()
    const [username, setUsername] = useState()
    const [images, setImages] = useState([])
    const [email, setEmail] = useState()
    const [profilepic, setProfilepic]=useState()
    const [isLoading, setIsLoading] = useState (true)

    const token =localStorage.getItem('token')
    if (token === null){
        history.push("/")
    }
    useEffect(() => {
        //if (token !== null) {
            axios({
                method: 'GET',
                url: 'https:/insta.nextacademy.com/api/v1/users/me',
                headers: {'Authorization': `Bearer ${token}` }
            })
            .then((result) =>{
                //console.log(result.data)
                setUsername(result.data.username)
                setEmail(result.data.email)
                setProfilepic(result.data.profile_picture)
            })
            axios({
                method: 'GET',
                url: 'https:/insta.nextacademy.com/api/v1/images/me',
                headers: {'Authorization': `Bearer ${token}` }
            })
            .then((result) =>{
                //console.log(result.data)
                setImages(result.data)
                setIsLoading(false)
            })
        //} else { history.push('/')}
    }, [])

    return(
        <div> 
            <h3 style={{ textAlign:"center"}}> Profile Page of {username} </h3>
            <img style={{display:"block", marginLeft:"auto", marginRight:"auto", width:100, height:100 }} src={profilepic}/>
            <h3 style={{ textAlign:"center"}}> Email : {email} </h3>
            <div style={{
            flex: 1, display: "flex", justifyContent:"space-around", flexWrap: "wrap", paddingTop:30
        }}>
        {isLoading ? <LoadingIndicator /> : images.map(image => (
            <img style={{width: 200, height:200}} src={image}/>
        ))}
      </div>
        </div>
    )
}

export default MyProfilePage