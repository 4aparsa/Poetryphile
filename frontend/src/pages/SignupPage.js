import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SignupPage = () => {
    let { signupUser } = useContext(AuthContext)
    return (
        <div>
            <h1>
                Signup Page. 
            </h1>
            <form onSubmit={signupUser}>
                <input type = 'email' name = 'email'></input>
                <input type = 'text' name = 'penName'></input>
                <input type = 'password' name = 'password'></input>
                <input type = 'password' name = 'rePassword'></input>
                <input type = 'submit'></input>
            </form>
            <p>Already have an account? <Link to = '/login'>Login</Link></p>
        </div>
    )
}

export default SignupPage;