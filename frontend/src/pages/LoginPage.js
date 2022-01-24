import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div>
            <h1>
                Login Page. 
            </h1>
            <form onSubmit={loginUser}>
                <input type = 'text' name = 'penName'></input>
                <input type = 'password' name = 'password'></input>
                <input type = 'submit'></input>
            </form>
            <p>Don't have an account? <Link to = '/signup'>Signup</Link></p>
        </div>
    )
}

export default LoginPage;  