import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state,action) => {
  if (action.type === "SET_USERS") {
    return {
      ...state,
      users: action.payload,
    };
  } else if (action.type === "SET_USERS_PROFILE") {
    return {
      ...state,
      profileFollowers: action.payload,
    };
  }else if(action.type === "FOLLOW_USERS_PROFILE"){
    return {
      ...state,
      profileFollowers: state.profileFollowers.map((user) =>
        user._id === action.payload._id
          ? { ...user, followers: action.payload.followers }
          : user
      ),
    };
  } else if (action.type === "FOLLOW_USER") {
    return {
      ...state,
      users: state.users.map((user) =>
        user._id === action.payload._id
          ? { ...user, followers: action.payload.followers }
          : user
      ),
    };
  } else {
    return state;
  }
}
    

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, {
      users: null,
      profileFollowers: null
    });
    return (
      <UsersContext.Provider value={{ ...state, dispatch }}>
        {children}
      </UsersContext.Provider>
    );
  };