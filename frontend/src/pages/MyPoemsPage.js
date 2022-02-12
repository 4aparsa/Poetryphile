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
    let [loadingMyPoems, setLoadingMyPoems] = useState(true)
    let [loadingMore, setLoadingMore] = useState(false)
    let [nextUrl, setNextUrl] = useState('http://localhost:8000/api/poems/my_poems/')
    let [count, setCount] = useState(0)
    let [hasMorePoems, setHasMorePoems] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        getMyPoems()
    }, [])

    let getMyPoems = async () => {
        setLoadingMore(true)
        let response = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        let hasMorePoems = data.next ? true : false
        if(response.status === 200) {
            console.log(data.message)
            setPoems(poems.concat(data.results))
            setNextUrl(data.next)
            setHasMorePoems(hasMorePoems)
            setLoadingMore(false)
            setCount(data.count)
            setLoadingMyPoems(false)
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
            navigate(`/poems/${data.id}`)
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
            let remainingPoems = poems.filter(poem => poem.id !== poemId)
            setPoems(remainingPoems)
            setCount(count - 1)
        } else {
            console.log(data.message)
        }
    }


    const people = [
        {
          name: 'Jane Cooper',
          title: 'Regional Paradigm Technician',
          department: 'Optimization',
          role: 'Admin',
          email: 'jane.cooper@example.com',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        // More people...
      ]

    return (
        <div>
            { loadingMyPoems === false ? (
                <div>
                    <h1>
                        My Poems Page. 
                    </h1>
                    <p>Listing {poems.length} of {count} total poems.</p>
                    { user && (
                        <p>{generateGreeting()} {user.pen_name}</p>
                    )}
                    <div className="flex flex-col">
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
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{poem.title}</div>
                                                                {/* <div className="text-sm text-gray-500">{poem.text}</div> */}
                                                            </div>
                                                        </div>
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
                                                        <Link to={`/poems/${poem.id}/edit`} className="text-primary-500 hover:text-primary-600 px-2">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => deletePoem(poem.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        { poems.map(poem => (
                            <div key = {poem.id}>
                                {getTitle(poem)}
                                {poem.text}
                                {getDateCreated(poem)}
                                <Link to={`/poems/${poem.id}`}>View</Link>
                                <Link to={`/poems/${poem.id}/edit`}>Edit</Link>
                                <button onClick={() => deletePoem(poem.id)}>Delete</button>
                            </div>
                        )) }
                    </div> */}
                    { hasMorePoems ? (
                        <div>
                            { loadingMore ? (
                                <p>Loading more...</p>
                            ) : (
                                <button onClick={getMyPoems}>Load More</button>
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