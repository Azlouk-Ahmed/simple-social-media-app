import React from 'react'
import { useEffect } from 'react';
import Loading from './Loading';
import { useUsersContext } from '../hooks/useUsersContext';
import UserDetails from './UserDetails';

    
    function Users() {
      const { users, dispatch } = useUsersContext();

      useEffect(() => {
        const fetchUsers = async () => {

          const response = await fetch("api/user/users");
          const json = await response.json();
          dispatch({type: "SET_USERS", payload: json})
  
        }
        fetchUsers(); 
      }, [dispatch])
      return (
        <div className="users-container">
          {users ? (
            users.map((workoutUser) => (
              <UserDetails workoutUser = {workoutUser} key={workoutUser._id} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      );
    }


    
    
    export default Users


    