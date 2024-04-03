import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import {
    updateStart,
    updateSuccess,
    updateFailure,
  } from '../redux/user/userSlice';
  import { useDispatch } from 'react-redux';

function UpdateAvatar() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [file,setFile] = useState('')
    const [image,setImage] = useState("")

    function previewFiles(file){
        const render = new FileReader()
    }

    const handleChnage = (e) => {
        const file= e.target.files[0]
        console.log(file);
        previewFiles(file)
    }

    

  return (
    <>
    <div className='container mt-5 align-items-center justify-content-center'>
        <form onSubmit={e => handleSubmit(e)}>
            <label htmlFor='fileInput'>update Avatar</label>
            <input type="file" id='avatar' onChange={e => handleChnage(e)} required />
        </form>
    </div>
    <img src="currentUser.data.user.avatar" alt="" />
    </>
  )
}

export default UpdateAvatar