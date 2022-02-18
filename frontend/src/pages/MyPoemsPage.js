import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'

import AuthContext from '../context/AuthContext';

import InkPreloader from '../components/InkPreloader'

let getTitle = poem => {
    let title = poem.title

    if (title.length > 45) {
        return title.slice(0, 45) + '...'
    }
    return title
}

let getText = poem => {
    let text = poem.text

    if (text.length > 45) {
        return text.slice(0, 45) + '...'
    } else {
        return text
    }
}

let getDateCreated = poem => {
    return moment.parseZone(poem.date_created).local().calendar()
}

let getDateUpdated = poem => {
    return moment.parseZone(poem.date_updated).local().calendar()
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

const initialQueryLimit = 10
const intialQueryOffset = 0
const initialQueryUrl = `http://localhost:8000/api/poems/my_poems/?limit=${initialQueryLimit}&offset=${intialQueryOffset}`

const MyPoemsPage = () => {

    const navigate = useNavigate();

    let { user, authTokens } = useContext(AuthContext)
    let [poems, setPoems] = useState([])
    let [loadingMyPoems, setLoadingMyPoems] = useState(true)
    let [loadingMore, setLoadingMore] = useState(false)
    let [queryUrl, setQueryUrl] = useState(initialQueryUrl)
    let [queryLimit, setQueryLimit] = useState(initialQueryLimit);
    let [hasMorePoems, setHasMorePoems] = useState(false)
    let [poemCount, setPoemCount] = useState(0)

    useEffect(() => {
        getMyPoems(true)
    }, [])

    let getMyPoems = async isInitialLoad => {
        if (!isInitialLoad) {
            setLoadingMore(true)
        }
        let response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        let hasMorePoems = data.next ? true : false
        if(response.status === 200) {
            setPoems(poems.concat(data.poems))
            if (isInitialLoad) {
                setLoadingMyPoems(false)
            }
            if (!isInitialLoad) {
                setLoadingMore(false)
            }
            setQueryUrl(data.next)
            setHasMorePoems(hasMorePoems)
            setPoemCount(data.count)
            setQueryLimit(data.limit);
        } else {
            console.log(data.message)
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
            console.log(data.message)
            navigate(`/poems/${data.id}/edit/`)
        } else {
            console.log(data.message)
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
        if (response.status === 200) {
            let response = await fetch(`http://localhost:8000/api/poems/my_poems/?limit=${queryLimit + initialQueryLimit}&offset=${intialQueryOffset}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                } 
            })
            let data = await response.json()
            setPoems(data.poems)
            setPoemCount(data.count)
        } else {
            console.log(data.message)
        }
    }

    return (
        <div>
            { loadingMyPoems === false ? (
                <div>
                    <h1>
                        My Poems Page. 
                    </h1>
                    <p>Listing {poems.length} of {poemCount} total poems.</p>
                    { user && (
                        <p>{generateGreeting()} {user.pen_name}</p>
                    )}
                    <div className="flex flex-col container">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Text
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Last Edited
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {poems.map((poem) => (
                                                <tr key={poem.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{getTitle(poem)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{getText(poem)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{getDateUpdated(poem)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        { poem.is_published ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                Not published
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className = "px-3" onClick={() => deletePoem(poem.id)}>
                                                            Delete
                                                        </button>
                                                        <Link to={`/poems/${poem.id}/edit`} className="text-primary-500 hover:text-primary-600">
                                                            Edit
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    { hasMorePoems ? (
                        <div>
                            { loadingMore ? (
                                <p>Loading more...</p>
                            ) : (
                                <button onClick={() => getMyPoems(false)}>Load More</button>
                            )}
                        </div>
                    ) : (
                        <p>The End.</p>
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