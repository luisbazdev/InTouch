import React, { useEffect, useState } from 'react'

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../../firebase'

// import { AiOutlineCheckSquare } from 'react-icons/ai'

import styles from './Request.module.css'

export default function Request({request, id}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUser(){
            const userRef = doc(db, "users", request.ownerId);
            const userSnap = await getDoc(userRef);
        
            const _user = userSnap.data()
    
            setUser(_user)
            setLoading(false)
        }

        fetchUser()
    }, [])

    async function acceptFriendRequest(){
        const requestRef = doc(db, "requests", id);

        await updateDoc(requestRef, {
          state: 'accepted'
        })

        var ownerRef = doc(db, 'users', request.ownerId)
        var targetRef = doc(db, 'users', request.targetId)

        await updateDoc(ownerRef, {
            friends: arrayUnion(request.targetId)
        })

        await updateDoc(targetRef, {
            friends: arrayUnion(request.ownerId)
        })
    }

    async function rejectFriendRequest(){
        const requestRef = doc(db, "requests", id);

        await updateDoc(requestRef, {
          state: 'rejected'
        })
    }

    if(loading)
        return <h1>Loading...</h1>

    return (
        <div className={styles.friend_request}>
            <img src={user.picture} className={styles.profilePicture}/>
            <div className={styles.friend_request_content}>
                <small>{user.name} sent you a friend request </small>
                <div className={styles.friend_request_buttons}>
                    <small className={styles.friend_request_accept} onClick={acceptFriendRequest}>Accept</small>
                    <small className={styles.friend_request_reject} onClick={rejectFriendRequest}>Reject</small>
                </div>
            </div>
        </div>
    )
}