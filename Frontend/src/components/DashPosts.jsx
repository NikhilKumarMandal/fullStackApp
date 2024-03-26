import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import { Modal, Table, Button } from 'flowbite-react';

function DashPosts() {
    const {currentUser} = useSelector((state) => state.user)
    console.log("currentUser :",currentUser);
    const [userPosts,setUserPosts] = useState([])

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
  
  console.log("userPosts",userPosts);
  return (
    <div>
        {currentUser.data.user.isAdmin && userPosts.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
              <span>Edit</span>
              </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post) => (
                    <Table.Body 
                    key={post._id}
                    className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                  </Table.Cell>
                  <Table.Cell>
                      {post.title}
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                ))

                }
            </Table>
            </>
        ):(
            <p>You have no posts yet!</p>
        )}
    </div>
  )
}

export default DashPosts