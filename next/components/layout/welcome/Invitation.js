import React, { useEffect, useState } from 'react'

import { db } from '../../../firebase'
import { collection, serverTimestamp, setDoc, doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore'

import styles from './Invitation.module.css'

export default function Invitation({session, invitation, invitationId}){

    const [profilePicture, setProfilePicture] = useState()

    useEffect(() => {
        async function fetchProfilePicture(){
            const userRef = doc(db, "users", invitation.ownerId);
            const userSnap = await getDoc(userRef);
        
            const _profilePicture = userSnap.data().picture
    
            setProfilePicture(_profilePicture)
        }

        fetchProfilePicture()
    }, [])
    
    async function acceptInvitation(){
        const invitationRef = doc(db, "invitations", invitationId);

        await updateDoc(invitationRef, {
          state: 'accepted'
        })

        const collRef = collection(db, `users/${session.uid}/groups`)
        const docRef = doc(collRef);

        setDoc(docRef, {
            groupId: invitation.groupId,
            joinedAt: serverTimestamp()
        })

        const groupRef = doc(db, "groups", invitation.groupId);

        await updateDoc(groupRef, {
            members: arrayUnion(session.uid)
        });
    }

    async function rejectInvitation(){
        const invitationRef = doc(db, "invitations", invitationId);

        await updateDoc(invitationRef, {
          state: 'rejected'
        })
    }

    return (
        <div className={styles.invitation}>
            <img src={profilePicture} className={styles.userPic}/>
            <div className={styles.invitation_content}>
                <small>{invitation.createdAt.toDate().toLocaleDateString()} · {invitation.createdAt.toDate().toLocaleTimeString()}</small>
                <p>{invitation.owner} invited you to <strong>{invitation.groupName}</strong></p>
                <div className={styles.invitation_buttons}>
                    <small className={styles.invitation_accept} onClick={acceptInvitation}>Accept</small>
                    <small className={styles.invitation_reject} onClick={rejectInvitation}>Reject</small>
                </div>
            </div>
        </div>
    )
}