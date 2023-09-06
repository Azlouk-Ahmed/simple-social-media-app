import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, useParams } from 'react-router-dom'
import axios from "axios";
import Loading from '../components/Loading';
import PostDetails from '../components/PostDetails';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import ProfileFollowers from '../components/ProfileFollowers';
import { useUsersContext } from '../hooks/useUsersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Profile() {
    
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const { profileWorkouts, dispatch } = useWorkoutsContext();
    const { dispatch : userDispatch } = useUsersContext();
    const { user } = useAuthContext();
    

    
    
    useEffect(() => {
        // Fetching the user's followers
        if (user && user.token) {
            axios.get(`http://localhost:4000/api/user/followers/${id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then(response => {
              userDispatch({ type: "SET_USERS_PROFILE", payload: response.data });
            })
            .catch(error => {
              console.log(error);
            });
        }
    
        //Fetching the user's profile
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
    }, [id, dispatch, user, userDispatch]);
    


  return (
    <div>
        {(profile) ? (
            <div className="user-profile">
                <div className="profile-img">
                    <img src={`/img/defaultcover.png`} className='cover' alt="" srcSet="" />
                    <div className="current-user">
                      <div className="profile-img-wrapper">
                          <img src={`/img/${(profile.user.img)? profile.user.img : "default.png"}`} alt="" srcSet="" />
                      </div>
                      <div className="current-user-data">
                        <span className='current-user-name'>{profile.user.name} - {profile.user.surname}
                        </span>
                        <span>{profile.user.followers.length} followers 
                        {`${profile.user.createdAt ? `joined ${formatDistanceToNow(new Date(profile.user.createdAt), { addSuffix: true })}` : ''}`}
                        </span>
                        <span>lives in {profile.country}</span>
                        <span>studies at {profile.education}</span>
                      </div>

                    </div>
                </div>
                <div className="profile">
                    <ProfileFollowers id = {id} />
                    <div className="workouts">
                        <h4>posts</h4>
                            {profileWorkouts.length >0 ? (
                                profileWorkouts.map(workout => (
                                    <PostDetails workout={{...workout,user : [profile.user]}} key={workout._id} currentUser={false} />
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