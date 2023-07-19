import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import Loading from '../components/Loading';
import PostDetails from '../components/PostDetails';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import ProfileFollowers from '../components/ProfileFollowers';
import { useUsersContext } from '../hooks/useUsersContext';

function Profile() {
    
    const {id} = useParams();
    const [user, setuser] = useState(null);
    const { profileWorkouts, dispatch } = useWorkoutsContext();
    const { dispatch : userDispatch } = useUsersContext();
    
    useEffect(() => {
        axios.get("http://localhost:4000/api/user/followers/"+id)
        .then(response => {
                userDispatch({type: "SET_USERS", payload: response.data})
                console.log("dispatched");
            })
            .catch(error => {
              console.log(error);
        })
        const getuser = async (id) => {
            axios.get("http://localhost:4000/api/user/profile/"+id)
          .then(response => {
            setuser(response.data)

           dispatch({type: 'SET_PROFILE_WORKOUTS', payload: response.data.posts});
           //console.log(response.data.posts );
          })
          .catch(error => {
            console.log(error);
          })
        }
    getuser(id);
      
    }, [id, dispatch, userDispatch])

  return (
    <div>
        {(user) ? (
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