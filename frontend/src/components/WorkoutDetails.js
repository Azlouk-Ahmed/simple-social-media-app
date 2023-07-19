import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext()
  const [loading, setloading] = useState(null)
  const [delloading, setdelloading] = useState(null)

  const handleClick = async () => {
    setdelloading("active")
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers : {'authorization' : `Bearer ${user.token}`}
    })
    const json = await response.json()
    
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
      setdelloading(null)
    }
  }
  const isLiked = workout.likes.includes(user.user._id);

  const handleLike = async () => {
    setloading("active");
    const response = await fetch("/api/workouts/like/"+ workout._id, {
      method: 'PUT',
      headers : {'authorization' : `Bearer ${user.token}`}
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'UPDATING_LIKE_COUNT', payload: json})
      setloading(null)
    }
  }
  

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
      <div className='workout-content'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
      </div>
      {delloading ? (
          <div className="loading material-symbols-outlined del">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
      ) : (
        <span className="material-symbols-outlined del" onClick={handleClick}>delete</span>
      )}
      <pre className='likes'> 
        {loading ? (
          <div className="loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
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
      </pre>
    </div>
  )
}

export default WorkoutDetails