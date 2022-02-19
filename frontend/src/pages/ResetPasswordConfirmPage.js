import { Link } from 'react-router-dom';
import logo from '../icons/logo.svg'
import { useParams } from 'react-router-dom';

const ResetPasswordConfirmPage = () => {
    let { uidb64, token } = useParams()
    let resetPasswordConfirm = async e => {
        e.preventDefault()
        let response = await fetch(`http://localhost:8000/api/accounts/${uidb64}/${token}/password_reset_confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'password': e.target.password.value, 're_password': e.target.rePassword.value })
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

                    <form className="mt-8 space-y-6" onSubmit={resetPasswordConfirm}>
                        
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id = "password" name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>

                            <div>
                                <label htmlFor="re-password" className="sr-only">Confirm Password</label>
                                <input id = "re-password" name="rePassword" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Confirm Password" />
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

export default ResetPasswordConfirmPage;