import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import Loading from '../components/Loading';
import PostDetails from '../components/PostDetails';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import ProfileFollowers from '../components/ProfileFollowers';
import { useUsersContext } from '../hooks/useUsersContext';
import { useAuthContext } from '../hooks/useAuthContext';

function Profile() {
    
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const { profileWorkouts, dispatch } = useWorkoutsContext();
    const { dispatch : userDispatch } = useUsersContext();
    const { user } = useAuthContext();
    

    
    
    useEffect(() => {
        // Fetching the user's followers
        axios.get(`http://localhost:4000/api/user/followers/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then(response => {
            userDispatch({type: "SET_USERS_PROFILE", payload: response.data})
            console.log("dispatched");
            console.log();
          })
          .catch(error => {
            console.log(error);
          });
      
        // Fetching the user's profile
        const getuser = async (id) => {
          axios.get(`http://localhost:4000/api/user/profile/${id}`)
            .then(response => {
              setProfile(response.data);
              dispatch({ type: 'SET_PROFILE_WORKOUTS', payload: response.data.posts });
            })
            .catch(error => {
              console.log(error);
            });
        };
      
        getuser(id);
      
      }, [id, dispatch, user]);

  return (
    <div>
        {(profile) ? (
            <div className="user-profile">
                <div className="profile-img">
                    <img src="/img/cover.jpg" className='cover' alt="" srcSet="" />
                    <div className="profile-img-wrapper">
                        <img src={`/img/${(user.user.img)? user.user.img : "default.png"}`} alt="" srcSet="" />
                    </div>
                </div>
                <div className="profile-info">
                    <span className='infor'>
                        <h4>name : </h4>{user.user.name} 
                    </span>
                    <span className='infor'>
                        <h4>surname : </h4>{user.user.surname} 
                    </span>
                    <span className='infor'>
                        <h4>email : </h4>{user.user.email} 
                    </span>

                </div>
                <div className="profile">
                    <ProfileFollowers id = {id} />
                    <div className="workouts">
                        <h4>posts</h4>
                            {profileWorkouts.length >0 ? (
                                profileWorkouts.map(workout => (
                                    <PostDetails workout={{...workout,user : [user.user]}} key={workout._id} />
                                ))
                                ) : (
                                <div>
                                    no posts yet ...
                                </div>
                                )}
                    </div>

                </div>
            </div>
        ) : (
            <Loading />
        ) }
    </div>
  )
}

export default Profile