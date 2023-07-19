import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogOut = () => {
    const {dispatch} = useAuthContext();
    const {dispatch : workoutsDispatch} = useWorkoutsContext();
    const logout = () => {
        localStorage.removeItem("user");
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'LOGOUT'})
    }
    return {logout};
}