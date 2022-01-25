import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import moment from 'moment'

const MyPoemsPage = () => {
    let { user, authTokens } = useContext(AuthContext)
    let [poems, setPoems] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getPoems()
    }, [])

    let getPoems = async () => {
        let response = await fetch('http://localhost:8000/api/poems/my_poems/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setPoems(data)
        }
    }

    let createPoem = async () => {
        let response = await fetch('http://localhost:8000/api/poems/create/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(response)
        if(response.status === 200){
            navigate(`/poems/${data.id}`)
        }
    }

    return (
        <div>
            <h1>
                My Poems Page. 
            </h1>
            { user && (
                <p>Hello, {user.pen_name}</p>
            )}
            <ul>
                { poems.map(poem => (
                    <li key = {poem.id}>{poem.title} - {poem.text} - {moment.parseZone(poem.date_created).local().calendar()}</li>
                )) }
            </ul>
            <button onClick={createPoem}>Create poem</button>
        </div>
    )
}

export default MyPoemsPage; 