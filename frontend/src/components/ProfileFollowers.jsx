import React from 'react'
import { useUsersContext } from '../hooks/useUsersContext';
import Loading from './Loading';
import ProfileUserDetails from './ProfileUserDetails';

function ProfileFollowers({id}) {
    const { profileFollowers
    } = useUsersContext();
  return (
    <div className="users-container">
      <h4>followers </h4>
        {profileFollowers ? (profileFollowers.length>0)?(
          
          profileFollowers.map((workoutUser) => (
            <ProfileUserDetails workoutUser = {workoutUser} key={workoutUser._id} />
        ))
        ) : (<div>no followers yet...</div>) : (
        <Loading />
        )}
    </div>
  )
}

export default ProfileFollowers