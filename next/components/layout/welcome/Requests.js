import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, doc, setDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase'

import Request from './Request';

import styles from './Requests.module.css'

export default function Requests({session}){

    const [request, setRequest] = useState('')
    const [requests, setRequests] = useState([])

    // Currently you send a friend request
    // by typing their email in the input,
    // find a way to make it easier and
    // more comfortable for the user
    async function sendFriendRequest(){
        let userQ = query(collection(db, "users"), where("email", "==", request));
        let userQuerySnapshot = await getDocs(userQ);

        let reqQ = query(collection(db, "requests"), where("from", "==", session.email), where("to", "==", request), where("status", "==", "pending"));
        let reqQuerySnapshot = await getDocs(reqQ);
        
        if(!userQuerySnapshot.empty && reqQuerySnapshot.empty && request != session.email){
            let collRef = collection(db, 'requests')
            let docRef = doc(collRef)

            setDoc(docRef, {
                state: 'pending',
                ownerId: session.uid,
                targetId: userQuerySnapshot.docs[0].data().uid,
                from: session.email,
                to: request,
                createdAt: serverTimestamp()
            })

            setRequest('')
        }
    }

    // Query all pending requests
    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, 'requests'), where('to', '==', session.email), where('state', '==', 'pending')), 
            (snapshot) => {
                setRequests(snapshot.docs)
            }) 
            
            return () => {
                unsubscribe()
            }
        }
    }, [session])

    return (
        <div className={styles.friends}>
            <div className={styles.friends_search}>
                <h3>Add a friend</h3>
                <div className={styles.friends_search_input}>
                    <input type='text' placeholder="i.e. luisbazd@gmail.com" value={request} onChange={(e) => setRequest(e.target.value)}/>
                    <button onClick={sendFriendRequest}>Send</button>
                </div>
            </div>
            <div className={styles.friends_container}>
                {requests?.map((request) => <Request request={request.data()}  id={request.id}/>)}
            </div>
        </div>


    )
}