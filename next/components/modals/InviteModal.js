import React, { useState } from 'react';

import { collection, doc, setDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'

import { AiOutlineClose } from 'react-icons/ai';

import styles from './InviteModal.module.css'

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
                    <h3>Invite member</h3>
                </div>
                <div className={styles.container}>
                    <input type='text' placeholder='Email' onChange={(e) => setMember(e.target.value)}/>
                </div>
                <div className={styles.submit}>
                    <small className={styles.cancel}
                    onClick={() => close(false)}
                    >Cancel</small>
                    <small className={styles.confirm}
                    disabled={!member}
                    onClick={inviteMember}
                    >Confirm</small>
                </div>
            </div>
        </div>
    )
}