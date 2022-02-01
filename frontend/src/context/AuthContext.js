import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loadingAuthStatus, setLoadingAuthStatus] = useState(true)

    const navigate = useNavigate();

    let signupUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/accounts/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'pen_name': e.target.penName.value, 'password': e.target.password.value, 're_password': e.target.rePassword.value })
        })
        let data = await response.json()
        if (response.status === 201) {
            console.log(data.message)
            navigate('/login')
        } else {
            console.log(data.message)
        }
    }

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'pen_name': e.target.penName.value, 'password': e.target.password.value })
        })
        let data = await response.json()
        if (response.status === 200) {
            console.log(data.message)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            console.log(data.message)
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        let response = await fetch('http://localhost:8000/api/accounts/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
             logoutUser()
        }

        if (loadingAuthStatus) {
            setLoadingAuthStatus(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        signupUser: signupUser,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        if (loadingAuthStatus) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            } 
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loadingAuthStatus])

    return (
        <AuthContext.Provider value={contextData}>
            {loadingAuthStatus ? null : children}
        </AuthContext.Provider>
    )
}