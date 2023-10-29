import { useState, useEffect  } from "react";
import { useLogIn } from "../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../Hooks/useAuthContext';

const Loginv2 = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogIn()
    const navigate = useNavigate()
    const {user} = useAuthContext()

    useEffect(() => {
        if (user) {
            if (user.role === 'buyer') {
                navigate('/');
            } else if (user.role === 'seller') {
                navigate('/seller-dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard');
            }
        }
    }, [user, navigate]);



    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)  
    }

    return (
        <form className="Login" onSubmit={handleSubmit}>
            <h3>Log-in</h3>
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
            <button disabled={isLoading}>Log-in</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Loginv2