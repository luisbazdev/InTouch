import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './NewBranchModal.module.css'

export default function NewBranchModal({session, group, close}){
    const [branchName, setBranchName] = useState('')
    const [branchColor, setBranchColor] = useState('')

    function submitBranch(branch, color, owner){
        let collRef = collection(db, `groups/${group}/branches`)
        let docRef = doc(collRef)

        setDoc(docRef, {
            branch,
            color,
            owner,
            createdAt: serverTimestamp()
        })

        setBranchName('')
        setBranchColor('')

        close(false)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <button onClick={() => close(false)}>Close</button>
                <div className={styles.header}>
                    <h3>Create A New Branch</h3>
                </div>
                <div className={styles.container}>
                    <p>Branch Name</p>
                    <input type='text' onChange={(e) => setBranchName(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <p>Branch Color</p>
                    <SwatchesPicker onChange={(color) => setBranchColor(color.hex)}/>
                </div>
                <div className={styles.submit}>
                    <button onClick={() => submitBranch(branchName, branchColor, session.uid)}>Create Branch</button>
                </div>
            </div>  
        </div>
    )
}