// Import the necessary dependencies
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Define a custom hook called useAuthContext
export const useAuthContext = () => {
    //Use the useContext hook to access the AuthContext
    const context = useContext(AuthContext)

    //Ensure the conext it not undefined or null
    if (!context) {
        throw Error('useAuthContext should only be used within an AuthContextProvider.')
    }
    // If the context is available, return it
    return context;
}
