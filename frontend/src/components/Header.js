import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <Link to = '/about'>About</Link>
            <span> | </span>
            { user ? (
                <div style = {{ 'display': 'inline-block' }} >
                    <Link to = '/my_poems'>My Poems</Link>
                    <span> | </span>
                    <Link to = '#' onClick={logoutUser}>Logout</Link>
                </div>
            ) : (
                <Link to = '/login'>Login</Link>
            )}
        </div>
    )
}

export default Header