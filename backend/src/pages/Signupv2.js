import { useState } from "react";
import {useSignup} from "../Hooks/useSignUp"
import { useNavigate } from 'react-router-dom';


const Signupv2 = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('buyer')
    const {signup, error, isLoading} = useSignup()
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, email, password, role)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign-up</h3>
            <label>username</label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Email address:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <input type="radio" 
                id="buyer" 
                name="role" 
                checked={role === 'buyer'}
                onChange={handleRoleChange}
                value="buyer"
            />
            <label htmlFor="buyer">Buyer</label>
            <input type="radio" 
                id="seller" 
                name="role" 
                checked={role === 'seller'}
                onChange={handleRoleChange}
                value="seller"
            />
            <label htmlFor="seller">Seller</label>
            <button disabled={isLoading}>Sign-up</button>
            {error && <div>{error}</div> }
        </form>
    )
}

export default Signupv2