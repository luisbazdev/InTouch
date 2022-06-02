import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import { AiOutlineClose } from 'react-icons/ai';

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
                <div className={styles.header}>
                    <h3>Create a new branch</h3>
                    <div className={styles.close} onClick={() => close(false)} >
                        <AiOutlineClose className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <strong>What's the branch name?</strong>
                    <input type='text' style={{color: branchColor}} onChange={(e) => setBranchName(e.target.value)}/>
                </div>
                <div className={styles.color}>
                    <strong>Pick a color for the branch</strong>
                    <SwatchesPicker width='100%' onChange={(color) => setBranchColor(color.hex)}/>
                </div>
                <div className={styles.submit}>
                    <button 
                    disabled={(!branchName || !branchColor)}
                    onClick={() => submitBranch(branchName, branchColor, session.uid)}
                    >Create</button>
                </div>
            </div>  
        </div>
    )
}