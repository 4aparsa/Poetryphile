import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../icons/logo.svg'

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt='logo' />

                        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-500">Sign in to your account</h2>

                        <p className="mt-2 text-center text-sm text-secondary">
                            Don't have an account?{' '}
                            <Link to = '/signup' className="font-medium text-primary-600 hover:text-primary-500">Signup</Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={loginUser}>
                        
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="pen-name" className="sr-only">Pen Name</label>
                                <input id = "pen-name" name="penName" type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Pen Name" />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id = "password" name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot your password?</Link>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-primary-50 bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;