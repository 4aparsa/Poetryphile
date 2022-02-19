import { Link } from 'react-router-dom';
import logo from '../icons/logo.svg'

const ResetPasswordRequestPage = () => {
    let resetPasswordRequest = async e => {
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/accounts/password_reset_request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value })
        })
        let data = await response.json()
        if (response.status === 200) {
            console.log(data)
        } else {
            console.log(data)
        }
    }
    return (
        <div>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt='logo' />

                        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-500">Reset Password</h2>

                        <p className="mt-2 text-center text-sm text-secondary">
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={resetPasswordRequest}>
                        
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id = "email" name="email" type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Email" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Remembered it?</Link>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-primary-50 bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Reset your password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordRequestPage;