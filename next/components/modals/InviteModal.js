import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './InviteModal.module.css'

import { AiOutlineClose } from 'react-icons/ai';

export default function InviteModal({session, group, close}){

    const [member, setMember] = useState(null)

    async function inviteMember(){
        let userQ = query(collection(db, "users"), where("email", "==", member));
        let userQuerySnapshot = await getDocs(userQ);

        let invQ = query(collection(db, "invitations"), where("from", "==", session.email), where("to", "==", member), where("group", "==", group.id));
        let invQuerySnapshot = await getDocs(invQ);

        if(!userQuerySnapshot.empty && invQuerySnapshot.empty && member != session.email){
            let collRef = collection(db, 'invitations')
            let docRef = doc(collRef)

            setDoc(docRef, {
                state: 'pending',
                owner: session.username,
                ownerId: session.uid,
                from: session.email,
                to: member,
                groupId: group.id,
                groupName: group.name,
                createdAt: serverTimestamp()
            })

            close(false)
        }
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Invite a member to your group</h3>
                    <div className={styles.close} onClick={() => close(false)} >
                        <AiOutlineClose className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <strong>Member's email</strong>
                    <input type='text' onChange={(e) => setMember(e.target.value)}/>
                </div>
                <div className={styles.submit}>
                    <button 
                    disabled={!member}
                    onClick={inviteMember}
                    >Invite</button>
                </div>
            </div>
        </div>
    )
}