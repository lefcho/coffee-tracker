import React, {useState} from 'react'


function Authentication() {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = ('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function handleAuthenticate() {
        return;
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