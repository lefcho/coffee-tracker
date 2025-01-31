import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

function getFriendlyErrorMessage(errorCode) {
    const errorMessages = {
        "auth/invalid-credential": "Invalid email or password. Please try again.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/network-request-failed": "Network error. Please check your connection."
    };

    return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
}


function Authentication(props) {
    const { handleCloseModal } = props;

    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { signup, login } = useAuth();

    

    async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password 
            || password.length < 6 || isAuthenticating) {
            return;
        }

        try {
            setIsAuthenticating(true);

            if (isRegistration) {
                // register a user
                await signup(email, password);
            } else {
                // login a user
                await login(email, password);
            }
            handleCloseModal();
        } catch (err) {
            console.log(err.message); // Log the error code
            setErrorMessage(getFriendlyErrorMessage(err.code));
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            <h2 className='sign-up-text'>{isRegistration ? 'Sign up' : 'Log in'}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign into your account!'}</p>
            {errorMessage && <p className='err-message'>&#x2022; {errorMessage}</p>}
            <input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder='Email' />
            <input value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder='******' />
            <button onClick={handleAuthenticate}>
                <p>{!isAuthenticating ? 'Submit': 'Authenticating...'}</p>
            </button>
            <hr />
            <div className='register-content'>
                <p>{isRegistration ? 'Already have an account?' :
                    'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}>
                    <p>{isRegistration ? 'Log in' : 'Sign up'}</p>
                </button>
            </div>
        </>
    )
}

export default Authentication