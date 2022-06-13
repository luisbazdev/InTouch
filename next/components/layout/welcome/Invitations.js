import React, { useState, useEffect } from "react"

import { onSnapshot, query, where, collection } from 'firebase/firestore';
import { db } from '../../../firebase';

import Invitation from './Invitation'

import styles from './Invitations.module.css'

export default function Invitations({session}){

    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, 'invitations'), where('to', '==', session.email), where('state', '==', 'pending')), 
            (snapshot) => {
                setInvitations(snapshot.docs)
            }) 
            
            return () => {
                unsubscribe()
            }
        }
    }, [session])

    return (
        <div className={styles.invitations}>
            <div className={styles.invitations_header}>
                <h2>Invitations</h2>
            </div>
            <div className={styles.invitations_container}>
                {invitations.map((inv) => <Invitation key={inv.id} session={session} invitation={inv.data()} invitationId={inv.id}/>)}
            </div>
        </div>
    )
}