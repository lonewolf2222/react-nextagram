import axios from 'axios'
import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/Loader'


const UserImagesTest = (props) =>{
const [isLoading, setIsLoading] = useState (true)
const [images, setImages] = useState([])

    useEffect(() => {
        axios.get(`https://webapp.leapnet.me/api/v1/images?userId=${parseInt(props.value)}`)
            .then(result =>{
                setImages(result.data)
                console.log(result.data)
                setIsLoading(false)
            })
    }, [])

    return (
    <div>
    <div className = "row" style={{paddingLeft:30, paddingTop:30}}>     
            {images.map(image => (
                <div className="col-sm-4 mb-2">
            <img style={{width: 300, height:300}} src={image}/>
            </div>
        ))}
        </div>
        </div>
       )
}

export default UserImagesTest