import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import moment from 'moment'

let getTitle = (poem) => {
    let title = poem.title
    if (title.length > 45) {
        return title.slice(0, 45) + '...'
    }
    return title
}

let getDateCreated = poem => {
    return moment.parseZone(poem.date_created).local().calendar()
}

let generateGreeting = () => {

    let currentHour = moment().format("HH");
  
    if (currentHour >= 3 && currentHour < 12){
        return "Good Morning,";
    } else if (currentHour >= 12 && currentHour < 15){
        return "Good Afternoon,";
    }   else if (currentHour >= 15 && currentHour < 20){
        return "Good Evening,";
    } else if (currentHour >= 20 || currentHour < 3){
        return "Good Night,";
    }
  }

const MyPoemsPage = () => {
    let { user, authTokens } = useContext(AuthContext)
    let [poems, setPoems] = useState([])
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        getPoems()
    }, [])

    let getPoems = async () => {
        let response = await fetch('http://localhost:8000/api/poems/my_poems/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setPoems(data)
            setLoading(false)
        }
    }

    let createPoem = async () => {
        let response = await fetch('http://localhost:8000/api/poems/create/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        if(response.status === 200){
            navigate(`/poems/${data.id}`)
        }
    }

    let deletePoem = async poemId => {
        let response = await fetch(`http://localhost:8000/api/poems/${poemId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        if (response.status == 200) {
            let filteredPoems = poems.filter(poem => poem.id !== poemId)
            setPoems(filteredPoems)
        }
    }

    return (
        <div>
            { loading == false ? (
                <div>
                    <h1>
                        My Poems Page. 
                    </h1>
                    { user && (
                        <p>{generateGreeting()} {user.pen_name}</p>
                    )}
                    <div>
                        { poems.map(poem => (
                            <div key = {poem.id}>
                                {getTitle(poem)}
                                {poem.text}
                                {getDateCreated(poem)}
                                <Link to={`/poems/${poem.id}`}>View</Link>
                                <button onClick={() => deletePoem(poem.id)}>Delete</button>
                            </div>
                        )) }
                    </div>
                    <button onClick={createPoem}>Create poem</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default MyPoemsPage; 