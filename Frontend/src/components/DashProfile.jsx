import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  console.log("CurrentUser :", currentUser);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const filePickerRef = useRef();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('avatar', imageFile); 
  try {
    const response = await fetch('http://localhost:8000/api/v1/users/avatar', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("DATA : ",data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload image');
    }

    console.log('Upload successful', data);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
  }

  console.log(imageFile,imageFileUrl);

 
  const dispatch = useDispatch();
 
        const persistedStateString = localStorage.getItem('persist:root');
          const persistedState = JSON.parse(persistedStateString);
          const accessToken = JSON.parse(persistedState.user)?.currentUser?.data?.accessToken;
  
          if (!accessToken) {
            throw new Error('Access token not found');
          }

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
          
        >
      
          <img
            src={ currentUser.data.user.avatar}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        
        <TextInput
          type='text'
          id='fullname'
          placeholder='fullname'

        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'

        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'

        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline

        >
          
        </Button>
        {imageFileUrl || currentUser.data.user.isAdmin && (
          <Link to={'/CreatePost'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
        
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
     
      <Modal


        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure'>
                Yes, I'm sure
              </Button>
              <Button color='gray' >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}