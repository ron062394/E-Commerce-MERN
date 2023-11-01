// Importing the necessary custom hooks from their respective files
import { useAuthContext } from "./useAuthContext";

// Creating a custom hook named useLogout to handle user logout functionality
export const useLogout = () => {
    // Destructuring the 'dispatch' function from the authentication context
    const { dispatch } = useAuthContext()
    const logout = () => {
        // Remove user information from local storage when logging out
        localStorage.removeItem('user')
        // Dispatch 'LOGOUT' action to update the authentication state
        dispatch({ type: 'LOGOUT' });
    }
    return {logout}
}