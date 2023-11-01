import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';


function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  
  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className='navbar'>
      {user && (
        <div className='user-container'>
          <span>{user.username}</span>
          <span className='vertical-divider'>|</span>
          <span className='logout-button' onClick={handleClick}>Log out</span>
        </div>

      )}
      {!user && (
        <div>
        <Link to="/signupv2">
          Sign-up
        </Link> 
        <span className='vertical-divider'>|</span>
        <Link to="/loginv2">
          Log-in
        </Link>
 
        </div>
      )}
    </nav>
  );
}

export default Navbar;
