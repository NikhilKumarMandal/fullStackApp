import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    
    try {
      const persistedStateString = localStorage.getItem('persist:root');
      const persistedState = JSON.parse(persistedStateString);
      const accessToken = JSON.parse(persistedState.user)?.currentUser?.data?.accessToken;
  
      if (!accessToken) {
      throw new Error('Access token not found');
      }

      dispatch(updateStart());
      const res = await fetch(`http://localhost:8000/api/v1/users/update-account`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log("hello",data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const persistedStateString = localStorage.getItem('persist:root');
      const persistedState = JSON.parse(persistedStateString);
      const accessToken = JSON.parse(persistedState.user)?.currentUser?.data?.accessToken;
  
      if (!accessToken) {
      throw new Error('Access token not found');
      }

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
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
        <TextInput
          type='text'
          id='fullname'
          placeholder='fullname'
          defaultValue={currentUser?.data?.user?.fullname}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser?.data?.user?.email}
          onChange={handleChange}
        />
        {/* <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        /> */}
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser?.data?.user?.isAdmin && (
          <Link to={'/createPost'}>
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
        <Link to='/updateAvatar'>
        <span onClick={handleSignout} className='cursor-pointer'>
          change avatar
        </span>
        </Link>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
       
      </Modal>
    </div>
  );
}