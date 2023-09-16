import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
import Users from "../components/Users";
import Loading from "../components/Loading";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/posts/',{
        headers : {
          'authorization' : `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json});
        console.log(workouts);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);


  return (
    <div className="home">
      <div>
      <h4>people you may know </h4>
      <Users />

      </div>
      {(workouts) && (<div className="workouts">
        {(workouts != null) ? (
          workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
            //<div> hello </div>
          ))
        ) : (
          <Loading />
        )}
      </div>)}
      <WorkoutForm />
    </div>
  );
};

export default Home;
