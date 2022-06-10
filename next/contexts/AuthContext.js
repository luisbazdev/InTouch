import React, { useState, useEffect } from "react";

import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from '../firebase';

import { useRouter } from "next/router";

import { doc, setDoc, getDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'

const AuthContext = React.createContext(null)

const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const [userGroups, setUserGroups] = useState([])

    const router = useRouter()

      useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, `users/${session.uid}/groups`), orderBy('joinedAt', 'desc')), 
            (snapshot) => {
              let _userGroups = []

              snapshot.docs.forEach(g => {
                  _userGroups.push(g.data().groupId)
              })

              setUserGroups(_userGroups)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [session])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                const username = user.displayName;
                const email = user.email;
                const pictureURL = user.photoURL;
                const uid = user.uid;
      
                const _session = { username, email, pictureURL, uid}
                setSession(_session)

                if(router.pathname == '/g/[groupId]' || router.pathname == '/login')
                    router.push('/')
            } 
            else{
              if(router.pathname == '/' || router.pathname == '/g/[groupId]')
                router.push('/login')
            }
          });          
    }, [])

    function signIn(){
        signInWithPopup(auth, provider)
        .then(async (result) => {
          const username = result.user.displayName;
          const email = result.user.email;
          const pictureURL = result.user.photoURL;
          const uid = result.user.uid;

          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if(!docSnap.exists()){
            setDoc(doc(db, "users", uid), {
                name: username,
                email,
                picture: pictureURL,
                uid,
            });
          }

          const _session = { username, email, pictureURL, uid}

          setSession(_session)
          router.push('/')

        }).catch((error) => {
            console.log(error)
        });
    }

    function logOut(){
        signOut(auth).then(() => {
            setSession(null)
            router.push('/login')
          }).catch((error) => {
            console.log(error)
          });
    }

    const data = {
        session,
        loading,
        setLoading,
        signIn,
        logOut,
        userGroups
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }

