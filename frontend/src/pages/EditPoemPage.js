import { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import InkPreloader from '../components/InkPreloader'

import {
    CheckIcon,
    LinkIcon,
  } from '@heroicons/react/solid'

const SavingPoemState = Object.freeze({
    NOT_SAVED: 0,
    SAVING: 1,
    SAVED: 2
})

const EditPoemPage = () => {
    let { poemId } = useParams()
    let { authTokens } = useContext(AuthContext)
    let [poem, setPoem] = useState(null)
    let [loadingPoemData, setLoadingPoemData] = useState(true)
    let [savingPoem, setSavingPoem] = useState(SavingPoemState.SAVED)
    let [autosaveTimer, setAutosaveTimer] = useState(null)

    const navigate = useNavigate();
    let poemTextEditorRef = useRef(null);

    useEffect(() => {
        if (poemTextEditorRef.current) {
            resizePoemTextEditor(poemTextEditorRef.current);
        }
    }, [loadingPoemData])

    useEffect(() => {
        getPoem()
    }, [poemId])

    let getPoem = async () => {
        let response = await fetch(`http://localhost:8000/api/poems/${poemId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setPoem(data)
            setLoadingPoemData(false)
        } else if (response.status === 403) {
            setPoem(null);
            setLoadingPoemData(false)
        } else if (response.status === 404) {
            navigate('/404')
        } else {
            console.log(data.message)
        }
    }

    let resizePoemTextEditor = poemTextEditor => {
        const target = poemTextEditor.target ? poemTextEditor.target : poemTextEditor;
        target.style.height = '100px';
        target.style.height = `${target.scrollHeight}px`
    }

    const onChange = e => {
        clearTimeout(autosaveTimer);
    
        setPoem({...poem, [e.target.name]: e.target.value })
        setSavingPoem(SavingPoemState.SAVING)

        if (e.target.name === 'text') {
            resizePoemTextEditor(e)
        }

        setAutosaveTimer(setTimeout(() => {
            setSavingPoem(SavingPoemState.SAVED)
            savePoemEdits(e)
        }, 1000));
    }

    let savePoemEdits = async e => {
        let response = await fetch(`http://localhost:8000/api/poems/${poemId}/edit/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({ [e.target.name]: e.target.value })
        })
        if(response.status === 200){
            setSavingPoem(SavingPoemState.SAVED)
        } else {
            setSavingPoem(SavingPoemState.NOT_SAVED)
        }
    }

    let publishPoem = async () => {
        let response = await fetch(`http://localhost:8000/api/poems/${poemId}/publish/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authTokens?.access}`,
            }
        })
        let data = await response.json()
        if(response.status === 200){
            console.log(data)
        } else {
            console.log(data.message)
        }
    }

    return (
        <div>
            { loadingPoemData && (
                <InkPreloader />
            )}
            { poem ? (
                <div>
                    { savingPoem === SavingPoemState.NOT_SAVED && (
                        <p>Not saved</p>
                    )}
                    { savingPoem === SavingPoemState.SAVING && (
                        <p>Saving...</p>
                    )}
                    { savingPoem === SavingPoemState.SAVED && (
                        <p>Saved</p>
                    )}
                    <input 
                        type = "text"
                        name = 'title'
                        value = {poem.title}
                        onChange={e => onChange(e)}>
                    </input>

                    <textarea
                        ref={poemTextEditorRef}
                        value = {poem.text}
                        name = 'text'
                        style = {{ "minHeight": "100px" }}
                        onChange={e => onChange(e)}>
                    </textarea>
                    <span className="sm:ml-3">
                        <button
                            onClick={publishPoem}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Publish
                        </button>
                    </span>
                </div>
            ) : (
                <h1>You do not have access to edit this poem.</h1>
            )}
        </div>
    )
}

export default EditPoemPage; 