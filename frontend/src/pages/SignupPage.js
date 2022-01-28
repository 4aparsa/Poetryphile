import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../icons/logo.svg'

const SignupPage = () => {
    let { signupUser } = useContext(AuthContext)
    return (
        <div>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt='logo'/>

                        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-500">Sign up for your account</h2>

                        <p className="mt-2 text-center text-sm text-secondary">
                            Already have an account?{' '}
                            <Link to = '/login' className="font-medium text-primary-600 hover:text-primary-500">Login</Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={signupUser}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id = "email" name="email" type="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Email" />
                            </div>

                            <div>
                                <label htmlFor="pen-name" className="sr-only">Pen Name</label>
                                <input id = "pen-name" name="penName" type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Pen Name" />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id = "password" name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>

                            <div>
                                <label htmlFor="re-password" className="sr-only">Confirm Password</label>
                                <input id = "re-password" name="rePassword" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-primary-50 bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;