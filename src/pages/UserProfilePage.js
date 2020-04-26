import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom";
import axios from 'axios'
import LoadingIndicator from '../components/Loader'

const UserProfilePage = () => {

    let {id} = useParams()
    const [isLoading, setIsLoading] = useState (true)
    const [images, setImages] = useState([])
        useEffect(() => {
            axios.get(`https://webapp.leapnet.me/api/v1/images?userId=${id}`)
        .then(result =>{
            //console.log(result.data)
            setImages(result.data)
            setIsLoading(false)  
        })
    }, [])
    const [username, setUsername] = useState ({})
    useEffect(() => {
        axios.get(`https://webapp.leapnet.me/api/v1/users/${id}`)
    .then(result =>{
        //console.log(result.data)
        setUsername(result.data)
    })
}, [])
    return (
        <div>
        <h3 style={{textAlign:"center"}}>Profile Page of {username.username}</h3>
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

export default UserProfilePage