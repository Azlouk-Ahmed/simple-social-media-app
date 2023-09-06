import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Loading from './Loading';
import axios from 'axios';

function PostDetails({workout,currentUser}) {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext()
  const [loading, setloading] = useState(null)
  const [delloading, setdelloading] = useState(null)

  const isLiked = workout.likes.includes(user.user._id);

  const handleLike = async () => {
    setloading("active");
  
    try {
      const response = await axios.put(`http://localhost:4000/api/posts/like/${workout._id}`, null, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      });
  
      if (response.status === 200) {
        dispatch({ type: 'UPDATING_PROFILE_LIKE_COUNT', payload: response.data });
        setloading(null);
      } else {
        console.error('Request failed with status code:', response.status);
        console.error('Response data:', response.data);
        setloading(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setloading(null);
    }
  };


const handleClick = async () => {
  if (!user) {
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:4000/api/posts/${workout._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 200) {
      dispatch({ type: 'DEL_PROFILE_WORKOUT', payload: response.data });
    }
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
};

  
  return (
    <div className="workout-details">
      <div className="user-info">
        <div className='user-info-wrapper'>
          <img src={(workout.user[0].img) ?`/img/${workout.user[0].img}` : `/img/default.png`} alt='' />
          <div className='user-info'>
            <p>{workout.user[0].name} - {workout.user[0].surname}</p>
            <p>posted {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
      </div>
      <div className="workout-content">
        <h4>{workout.title}</h4>
        <p>{workout.description}</p>
        <div className="post-image-holder">
          <img className="post-img" src={workout.image} alt="" />
        </div>
      </div>
      {!currentUser && (<pre className='likes'> 
        {loading ? (
          <span>loading ... </span>
        ) : (
          <>
            {isLiked ? (
                <span className="material-symbols-outlined" onClick={handleLike}> thumb_down </span> 
                ) : (
                  <span className="material-symbols-outlined" onClick={handleLike}> thumb_up </span> 
            )}
            <span>{workout.likes.length}</span>
          </>
        )}
      </pre>)}
      {currentUser && (
        <span className="material-symbols-outlined delete-button" onClick={handleClick}>delete</span>
      )}
    </div>
  )
}

export default PostDetails