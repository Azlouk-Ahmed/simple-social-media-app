import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "SET_PROFILE_WORKOUTS":
      return {
        profileWorkouts: action.payload,
      };
    case "UPDATING_PROFILE_LIKE_COUNT":
      return {
        profileWorkouts: state.profileWorkouts.map((workout) =>
          workout._id === action.payload._id
            ? { ...workout, likes: action.payload.likes }
            : workout
        ),
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "LOGOUT":
      return {
        workouts: null,
      };
    case "DEL_PROFILE_WORKOUT":
      return {
        currentUserPosts: state.currentUserPosts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATING_LIKE_COUNT":
      return {
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id
            ? { ...workout, likes: action.payload.likes }
            : workout
        ),
      };
      case 'CURRENT_USER_POSTS':
      return { 
        currentUserPosts: action.payload,
      }
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    profileWorkouts: [],
    currentUserPosts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
