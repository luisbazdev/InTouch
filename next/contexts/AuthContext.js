import React, { useState, useEffect } from "react";

import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from '../firebase';

import { useRouter } from "next/router";

const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                const username = user.displayName;
                const pictureURL = user.photoURL;
                const uid = user.uid;
      
                const s = { username, pictureURL, uid}
                setSession(s)

                if(router.pathname == '/g/[groupId]' || router.pathname == '/login'){
                    router.push('/')
                }
            } 
            else{
              if(router.pathname == '/' || router.pathname == '/g/[groupId]')
                router.push('/login')
            }
          });          
    }, [])

    function signIn(){
        signInWithPopup(auth, provider)
        .then((result) => {
          const username = result.user.displayName;
          const pictureURL = result.user.photoURL;
          const uid = result.user.uid;

          const s = { username, pictureURL, uid}
          setSession(s)

          router.push('/')
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
            // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    function logOut(){
        signOut(auth).then(() => {
            setSession(null)
            router.push('/login')
          }).catch((error) => {
            // An error happened.
          });
    }

    const data = {
        session,
        loading,
        setLoading,
        signIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }

