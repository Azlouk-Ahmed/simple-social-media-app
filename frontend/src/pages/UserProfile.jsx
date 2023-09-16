import React from 'react'
import Currentuserposts from '../components/Currentuserposts'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function UserProfile() {
  const { user } = useAuthContext();
  const {dispatch} = useAuthContext();
  const {dispatch : workoutsDispatch} = useWorkoutsContext();
  const deleteAccount = async (e) => {
    e.preventDefault();
    axios.delete("http://localhost:4000/api/user/delete",{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(response => {
      localStorage.removeItem("user");
      dispatch({type: 'LOGOUT'})
      workoutsDispatch({type: 'LOGOUT'})
      
    }).catch(error => console.log(error))
  }
  return (
    <div className='userprofile'>
         {(user )? 
          (<div>
            <div className="current-user-info">
            <div className="current-user-images">
                <div className="cover">
                  <img src={(!user.user.cover)? "/img/default.png" : `/img/${user.user.cover}`} alt="" />
                </div>
                <div className="current-user">
                  <div className="current-profile-image">
                      <img src={(!user.user.img)? "/img/default.png" : `/img/${user.user.img}`} alt="" />
                  </div>
                  <div className="current-user-data">
                    <span className='current-user-name'>{user.user.name} - {user.user.surname} • <Link to="edit"><AiOutlineSetting /> edit profile</Link></span>
                    <span>{user.user.followers.length} followers 
                    {`${(user.user.createdAt) ? `• joined ${formatDistanceToNow(new Date(user.user.createdAt), {
                          addSuffix: true,
                        })}` : ""}`}
                    </span>
                    <span>lives in <b> {user.user.country}</b> </span>
                    <span>studies at <b> {user.user.education}</b></span>
                  </div>
                  <div>
                    <form action="" onSubmit={deleteAccount}>
                      <button className='restricted'>
                        delete account 
                      </button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
        <div className="bio">
          <span>
            {`${user.user.bio ? user.user.bio : "this user is currently has no bio"}`}
          </span>
          <div className="author">~ {user.user.name}</div>
        </div>
         <Currentuserposts />
          </div>) : (<div>loading</div>)}
    </div>
  )
}

export default UserProfile