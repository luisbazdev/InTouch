import React, { useState, useEffect } from "react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';

import { useRouter } from "next/router";

const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    // only apply this for /, /g/* and /login routes
    if(router.pathname == '/login' || router.pathname == '/' || router.pathname == '/g/[groupId]'){
        useEffect(() => {
            fetch('http://localhost:3005/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((session) => {
                if(session.credentials == null && router.pathname == '/login'){
                    console.log('case 1')
                }
                else if(session.credentials != null && router.pathname == '/g/[groupId]'){
                    console.log('case 2')
                    setLoading(true)
                    setSession(session.credentials)
                    router.push('/')
                }
                else if(session.credentials != null && router.pathname == '/'){
                    console.log('case 3')
                    setSession(session.credentials)
                }
                else if(session.credentials != null && router.pathname == '/login'){
                    console.log('case 4')
                    setSession(session.credentials)
                    router.push('/')
                }
                else{
                    console.log('case 5')
                    setSession(session.credentials)
                    router.push('/login')
                }
            })
            .finally(() => setLoading(false))
        }, [])
    }
    

    function signIn(){
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user.displayName
            const pictureURL = result.user.photoURL
            const uid = result.user.uid

            const credentials = {
                user,
                pictureURL,
                uid
            }

            fetch('http://localhost:3005/api/auth/authenticate', {
                method: 'POST',
                body: JSON.stringify(credentials),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(() => {
                setSession(credentials)
                router.push('/')
            })
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
    }

    function logOut(){
        fetch('http://localhost:3005/api/auth/logout', {
            method: 'POST'
        })
        .then((res) => res.json())
        .then((session) => {
            setSession(session.credentials)
            router.push('/login')
        })
    }

    const data = {
        session,
        signIn,
        logOut,
        loading,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }

