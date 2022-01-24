import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const MyPoemsPage = () => {
    let { user } = useContext(AuthContext)
    return (
        <div>
            <h1>
                My Poems Page. 
            </h1>
            { user && (
                <p>Hello, {user.pen_name}</p>
            )}
        </div>
    )
}

export default MyPoemsPage; 