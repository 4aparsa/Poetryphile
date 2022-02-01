import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

import InkPreloader from '../components/InkPreloader'

let getDateCreated = poem => {
    return moment.parseZone(poem.date_created).local().calendar()
}

const PoemPage = () => {
    let { poemId } = useParams()
    let { user, authTokens } = useContext(AuthContext)
    let [poem, setPoem] = useState(null)
    let [loadingPoem, setLoadingPoem] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        getPoem()
    }, [poemId, user])

    let config = { 
        method: 'GET'
    }
    if (user) {
        config.headers = { 'Authorization': `Bearer ${authTokens?.access}` }
    }
    let getPoem = async () => {
        let response = await fetch(`http://localhost:8000/api/poems/${poemId}/`, config)
        let data = await response.json()
        if(response.status === 200){
            setPoem(data)
            setLoadingPoem(false)
        } else if (response.status === 403) {
            setPoem(null);
            setLoadingPoem(false)
        } else if (response.status === 404) {
            navigate('/404')
        } else {
            console.log(data.message)
        }
    }

    return (
        <div>
            { loadingPoem && (
                <InkPreloader />
            )}
            { poem ? (
                <div>
                    <h1>
                        {poem.title}
                    </h1>
                    <p>Written by {poem.user.pen_name}</p>
                    <p>{poem.text}</p>
                    <p>{getDateCreated(poem)}</p>
                </div>
            ) : (
                <h1>You do not have access to view this poem.</h1>
            )}
        </div>
    )
}

export default PoemPage; 