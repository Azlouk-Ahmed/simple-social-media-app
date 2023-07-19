import React from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUsersContext } from "../hooks/useUsersContext";
import Loading from "./Loading";
import { Link } from 'react-router-dom';
import axios from "axios";

function UserDetails({ workoutUser }) {
  const [loading, setloading] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useUsersContext();
  const followUser = async (id) => {
    setloading("isLoading");
    axios
    .put("http://localhost:4000/api/user/follow/" + id, {}, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      dispatch({ type: 'FOLLOW_USER', payload: response.data });
      setloading(null);
    })
    .catch((error) => console.log(error));
  };
  return (
    <div className="user">
      <div className="user-information">
      <Link to ={`/profile/${workoutUser._id}`}>
        <div className="img">
          <img
            src={workoutUser.img ? `/img/${workoutUser.img}` : `/img/default.png`}
            alt=""
            srcSet=""
          />
        </div>
        </Link>
        <span className="name">
          <Link to ={`/profile/${workoutUser._id}`}>
            <span>
                {workoutUser.name} {workoutUser.surname}
            </span>
          </Link>
          <span>{workoutUser.followers.length} followers</span>
        </span>
      </div>
      {!workoutUser.followers.includes(user.user._id) ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <button
              disabled={loading}
              className={`primary-btn`}
              onClick={() => followUser(workoutUser._id)}
            >
              follow
            </button>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <button
              disabled={loading}
              className={`secondary-btn`}
              onClick={() => followUser(workoutUser._id)}
            >
              unfollow
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default UserDetails;
