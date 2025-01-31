
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;
    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            console.log('Current user: ', user);
            

            if (!user) {
                console.log('No active user.');
                return;
            }

            try {
                setIsLoading(true);

                // create a ref for the documnet (labeled JSON obj)
                const docRef = doc(db, 'users', user.uid);
                // snapshot the doc to see if there is anything there
                const docSnap = await getDoc(docRef);

                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found user data');
                    firebaseData = docSnap.data();
                }
                
                setGlobalData(firebaseData);
            } catch(err) {
                console.log(err.message);
                
            } finally {
                setIsLoading(false);
            }
            
        });
        return unsubscribe;
    }, [])

    const value = {
        globalUser,
        globalData,
        setGlobalData,
        isLoading,
        signup,
        login,
        logout,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
