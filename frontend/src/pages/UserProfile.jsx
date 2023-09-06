import React from 'react'
import Currentuserposts from '../components/Currentuserposts'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';

function UserProfile() {
  const { user } = useAuthContext();
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