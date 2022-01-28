import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import moment from 'moment'

import InkPreloader from '../components/InkPreloader'

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
    let [loadingMore, setLoadingMore] = useState(false)
    let [nextUrl, setNextUrl] = useState('http://localhost:8000/api/poems/my_poems/')
    let [count, setCount] = useState(0)
    let [hasMorePoems, setHasMorePoems] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        getPoems()
    }, [])

    let getPoems = async () => {
        setLoadingMore(true)
        let response = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        let hasMorePoems = data.next ? true : false
        if(response.status === 200){
            setPoems(poems.concat(data.results))
            setNextUrl(data.next)
            setHasMorePoems(hasMorePoems)
            setLoadingMore(false)
            setCount(data.count)
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
                    <p>Listing {poems.length} of {count} total poems.</p>
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
                    { hasMorePoems ? (
                        <div>
                            { loadingMore ? (
                                <p>Loading more...</p>
                            ) : (
                                <button onClick={getPoems}>Load More</button>
                            )}
                        </div>
                    ) : (
                        <p>No more poems.</p>
                    )}
                    <button onClick={createPoem}>Create poem</button>
                </div>
            ) : (
                <InkPreloader />
            )}
        </div>
    )
}

export default MyPoemsPage; 