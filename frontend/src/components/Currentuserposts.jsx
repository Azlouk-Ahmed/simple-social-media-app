import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from "axios";
import PostDetails from "./PostDetails";

function Currentuserposts() {
  const { currentUserPosts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user) return;

        const response = await axios.get('http://localhost:4000/api/posts/user', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status === 200) {
          dispatch({ type: 'CURRENT_USER_POSTS', payload: response.data });
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch, user]);
  return (
    <div className="curent-user-posts">
        {currentUserPosts && 
            currentUserPosts.length > 0 ? currentUserPosts.map(post => (
                <PostDetails workout={{...post,user : [user.user]}} key={post._id} currentUser= {true} />
            )) : (
                <div>you haven't post anything yet ...</div>
            )
        }
    </div>
  )
}

export default Currentuserposts;
