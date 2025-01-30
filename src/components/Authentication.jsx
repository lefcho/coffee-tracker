import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';


function Authentication() {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = ('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const { signup, login } = useAuth();

    async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password ||  password.length < 6 || isAuthenticating) {
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
        } catch(err) {
            console.log(err.message);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
        <h2 className='sign-up-text'>{isRegistration ? 'Sign up' : 'Log in'}</h2>
        <p>{isRegistration ? 'Create an account!' : 'Sign into your account!'}</p>
        <input  value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="text" placeholder='Email' />
        <input  value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" placeholder='******' />
        <button onClick={handleAuthenticate}>
            <p>Submit</p>
        </button>
        <hr />
        <div className='register-content'>
            <p>{isRegistration ?    'Already have an account?': 
                                    'Don\'t have an account?'}</p>
            <button onClick={() => {setIsRegistration(!isRegistration)}}>
                <p>{isRegistration ? 'Log in' : 'Sign up'}</p>
            </button>
        </div>
        </>
    )
    }

export default Authentication