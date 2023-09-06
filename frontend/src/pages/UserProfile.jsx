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
                  <img src={(!user.image)? "/img/default.png" : `/img/${user.img}`} alt="" />
                </div>
                <div className="current-user">
                  <div className="current-profile-image">
                      <img src={(!user.image)? "/img/default.png" : `/img/${user.img}`} alt="" />
                  </div>
                  <div className="current-user-data">
                    <span className='current-user-name'>{user.user.name} - {user.user.surname} • <Link to="edit"><AiOutlineSetting /> edit profile</Link></span>
                    <span>{user.user.followers.length} followers • joined {formatDistanceToNow(new Date(user.user.createdAt), {
                          addSuffix: true,
                        })}</span>
                    <span>lives in {user.country}</span>
                    <span>studies at {user.education}</span>
                  </div>
                </div>
            </div>
        </div>
        <div className="bio">
          <span>
            be the change you wanted to see in the world
          </span>
          <div className="author">~ arnold smith</div>
        </div>
         <Currentuserposts />
          </div>) : (<div>loading</div>)}
    </div>
  )
}

export default UserProfile