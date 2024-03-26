import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'

function DashPosts() {
    const {currentUser} = useSelector((state) => state.user)
    console.log("currentUser :",currentUser);
    const [userPosts,setUserPosts] = useState([])
    console.log(userPosts);
    useEffect(() => {
      const getAccessToken = async () => {
          try {
              const persistedStateString = localStorage.getItem('persist:root');
              const persistedState = JSON.parse(persistedStateString);
              const accessToken = JSON.parse(persistedState.user)?.currentUser?.data?.accessToken;
  
              if (!accessToken) {
                  throw new Error('Access token not found');
              }
  
              const res = await fetch(`http://localhost:8000/api/v1/blogs/`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`
                  }
              });
              console.log("res :",res);
              const responseData = await res.json();
  
              if (res.ok) {
                setUserPosts(responseData.posts);
                  console.log("Response Data:", responseData); 
                  const userUsername = currentUser.data.user.username;
                  const filteredPosts = responseData.data.blogs.filter(post => post.author === userUsername);
                console.log(filteredPosts);
                  console.log("Hello",currentUser.data.user.author)
                  setUserPosts(filteredPosts);
                 
              } else {
                  throw new Error('Failed to fetch data');
              }
          } catch (error) {
              console.log(error);
          }
      };
  
      if (currentUser.data.user.isAdmin) {
          getAccessToken();
          console.log("isAdmin :",currentUser.data.user.isAdmin);
      }
  }, [currentUser.data.user._id]);
  
  
  return (
    <div>DashPosts</div>
  )
}

export default DashPosts