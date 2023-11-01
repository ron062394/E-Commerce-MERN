//Create this component first then proceed to useAuthContext

//Import conext functions
import { createContext, useReducer, useEffect, children } from "react";

// Create an authentication context using React's createContext
export const AuthContext = createContext();

// Define a reducer function to manage authentication state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload} // Set the user data when logging in
        case 'LOGOUT':
            return {user: null} // Clear the user data when logging out
        default:
            return state
    }
}

// Create an AuthContextProvider component
export const AuthContextProvider = ({children}) => {
    //Initialize the state and dispatch function using useReducer
    //Creating a structured way to manage the authentication state and handle actions that change that state. 
    const [state, dispatch] = useReducer(authReducer, {
        user: null, // Initial state with no user
    });

    // Use useEffect to load user data from local storage if it exists
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // If a user exists, dispatch a 'LOGIN' action to set the user in the state
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, []);

    return(
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}