const { createContext, useReducer } = require("react");

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    if(action.type === "LOGIN"){
        return { user : action.payload }
    }else if (action.type === "LOGOUT"){
        return { user : null }
    } else if(action.type === "EDIT_USER") {
        return {
            user: { ...state.user,user:{ ...action.payload }},
          };
    }else {
        return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,{user : null});
    console.log(state);
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}