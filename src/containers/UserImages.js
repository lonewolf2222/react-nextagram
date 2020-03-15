import axios from 'axios'
import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/Loader'


const UserImages = (props) =>{
const [isLoading, setIsLoading] = useState (true)
const [images, setImages] = useState([])

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${parseInt(props.value)}`)
            .then(result =>{
                setImages(result.data)
                //console.log(result.data)
                setIsLoading(false)
            })
    }, [])

    return (
    <div>
    <div style={{ flex: 1, display: "flex", justifyContent:"space-around", flexWrap: "wrap", paddingLeft:30, paddingTop:30}}> 
        {isLoading ? <LoadingIndicator />  
        :
            images.map(image => (
            <img style={{width: 200, height:200}} src={image}/>
        
        ))}
        </div>
        </div>
       )
}

export default UserImages