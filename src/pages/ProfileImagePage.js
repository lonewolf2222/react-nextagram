import React, {useState} from 'react';
import axios from 'axios'
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

const ProfileImagePage = () => {
    
    let history = useHistory()
    const token = localStorage.getItem('token')
    if (token === null){
        history.push("/")
    }

  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImageUrl] = useState("")
  const onChange = (e) => {
      setPreviewImageUrl( URL.createObjectURL(e.target.files[0]))
      setImageFile(e.target.files[0])
  }
  const onSubmit = (e) => {
      e.preventDefault()
      
      let formData = new FormData()  
      formData.append("image", imageFile)
    
        axios.post("https://webapp.leapnet.me/api/v1/images/profileimage", formData, 
                { headers: { Authorization: `Bearer ${token}`}})
        .then((response) => {
            if (response.data.success)
                toast.success("Your photo was uploaded")
                setPreviewImageUrl(null)
                setImageFile(null)  
                history.push("/profile")
            })
            .catch(error =>{
                console.log(error)
                toast.error("A problem occurred")
                history.push("/profile")
            })
            
        }
    
    return(
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h3>Upload your photo here</h3>
        <img src={previewImage} height="200px" width="200px"/>
    
    <Form onSubmit ={onSubmit}>
        <FormGroup>
            <Input type="file" onChange={onChange}/>
            <FormText color="muted">
                Make sure the image being uploaded is a supported format.
            </FormText>
        </FormGroup>
        <Button type="submit" color="primary"> Upload </Button>
    </Form>

    </div>
    )
}
    export default ProfileImagePage