import React from 'react'
import { useUsersContext } from '../hooks/useUsersContext';
import UserDetails from './UserDetails';
import Loading from './Loading';

function ProfileFollowers({id}) {
    const { users } = useUsersContext();
      
  return (
    <div className="users-container">
      <h4>followers </h4>
        {users ? (users.length>0)?(
          
        users.map((workoutUser) => (
            <UserDetails workoutUser = {workoutUser} key={workoutUser._id} />
        ))
        ) : (<div>no followers yet...</div>) : (
        <Loading />
        )}
    </div>
  )
}

export default ProfileFollowers