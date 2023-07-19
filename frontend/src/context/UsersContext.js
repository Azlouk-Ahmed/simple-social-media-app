import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state,action) => {
    if(action.type === "SET_USERS"){
        return {
            users : action.payload
        }
    } 
    else if (action.type === "FOLLOW_USER") {
        return {
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
    });
    console.log(state);
    return (
      <UsersContext.Provider value={{ ...state, dispatch }}>
        {children}
      </UsersContext.Provider>
    );
  };