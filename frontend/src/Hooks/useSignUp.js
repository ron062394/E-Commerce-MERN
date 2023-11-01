//Import necessary dependencies
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//Create a custom hook named useSignUp for handling user registration
export const useSignup = () => {
    // Initialize state variables for managing error and loading status
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    // Access the authentication context using useAuthContext
    const {dispatch} = useAuthContext();

    // Define the signup function, which will be used to initiate the registration process
    const signup = async (username, email, password, role) => {
        // Set isLoading to true and clear any previous errors
        setIsLoading(true)
        setError(null)
        
        // Prepare the request body with user registration data
        const requestBody = {
            username,
            email,
            password,
            role,
        };
        console.log(requestBody)
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })

        // Parse the response as JSON
        const json = await response.json();
        
        // Check if the response indicates an unsuccessful registration attempt
        if (response.ok) {
            // Set isLoading to false and update the error state with the error message from the server
            setIsLoading(false);
            setError(json.error);
        }

        // If the response indicates a successful registration
        if (response.ok) {
            // Save the user data to local storage for persistent authentication
            localStorage.setItem('user', JSON.stringify(json));

            // Update the authentication context by dispatching a 'LOGIN' action with the user data as the payload
            dispatch({ type: 'LOGIN', payload: json })

            //Update loading state
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}