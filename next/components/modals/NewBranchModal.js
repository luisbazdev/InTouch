import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './NewBranchModal.module.css'

export default function NewBranchModal({session, group, close, back}){
    const [branchName, setBranchName] = useState('')
    const [branchColor, setBranchColor] = useState('')

    function submitBranch(branch, color, ownerId, ownerName){
        let collRef = collection(db, `groups/${group.id}/branches`)
        let docRef = doc(collRef)

        setDoc(docRef, {
            branch,
            color,
            ownerId,
            ownerName,
            createdAt: serverTimestamp()
        })

        setBranchName('')
        setBranchColor('')

        close(false)
    }

    return (
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Create a new branch</h3>
                </div>
                <div className={styles.container}>
                    <input type='text' placeholder='Title' style={{color: branchColor}} onChange={(e) => setBranchName(e.target.value)}/>
                </div>
                <div className={styles.color}>
                    <h4>Color</h4>
                    <SwatchesPicker width='100%' onChange={(color) => setBranchColor(color.hex)}/>
                </div>
                <div className={styles.submit}>
                    <small className={styles.back}
                    onClick={back}
                    >Back</small>
                    <small className={styles.cancel}
                    disabled={(!name || !description || !overview || !picture)} 
                    onClick={() => close(false)}
                    >Cancel</small>
                    <small className={styles.confirm}
                    disabled={(!name || !description || !overview || !picture)} 
                    onClick={() => submitBranch(branchName, branchColor, session.uid, session.username)}
                    >Confirm</small>
                </div>
            </div>  
    )
}