// Import necessary dependencies
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Create a custom hook named useLogin for handling user login
export const useLogIn = () => {
    // Initialize state variables for managing error and loading status
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)

    // Access the authentication context using useAuthContext
    const {dispatch} = useAuthContext()

    // Define the login function, which will be used to initiate the login process
    const login = async (email, password) => {
        // Set isLoading to true and clear any previous errors      
        setIsLoading(true);
        setError(null);
        
        // Send a POST request to the '/api/user/login' endpoint to perform user authentication
        const response = await fetch('api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        //Takes the JSON data from the response, parses it, and stores it as a JavaScript object in the json variable
        const json = await response.json();

        //Check if the response indicates a successful login
        if (response.ok){
            // Save the user data to local storage for persistent authentication
            localStorage.setItem('user', JSON.stringify(json));

            // Update the authentication context by dispatching a 'LOGIN' action with the user data as the payload
            dispatch({ type: 'LOGIN', payload: json })
            // Set isLoading to false after successful login
            setIsLoading(false);
        }
    };
    // Return an object with the login function, loading status, and error
    return {login, isLoading, error}
} 