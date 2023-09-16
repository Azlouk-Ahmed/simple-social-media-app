import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const [loading, setloading] = useState(null);

  const isLiked = workout.likes.includes(user.user._id);

  const handleLike = async () => {
    setloading("active");
    const response = await fetch("/api/posts/like/" + workout._id, {
      method: "PUT",
      headers: { authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATING_LIKE_COUNT", payload: json });
      setloading(null);
    }
  };
  console.log("workout ",workout);

  return (
    workout.user[0] && (<div className="workout-details">
      <div className="user-info">
        <div className="user-info-wrapper">
          <img
            src={
              workout.user[0].img
                ? `/img/${workout.user[0].img}`
                : `/img/default.png`
            }
            alt=""
          />
          <div className="user-info">
            <p>
              {workout.user[0].name} - {workout.user[0].surname}
            </p>
            <p>
              posted{" "}
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </p>
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
      <pre className="likes">
        {loading ? (
          <div>loading ...</div>
        ) : (
          <>
            {isLiked ? (
              <span>
                <AiFillLike onClick={handleLike} />
              </span>
            ) : (
              <span>
                <AiOutlineLike onClick={handleLike} />
              </span>
            )}
            <span>{workout.likes.length}</span>
          </>
        )}
      </pre>
    </div>)
  );
};

export default WorkoutDetails;
