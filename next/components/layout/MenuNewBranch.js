import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

export default function MenuNewBranch({group, styles, session, seeNewBranch, setSeeNewBranch}){
    const [branchName, setBranchName] = useState('');
    const [branchColor, setBranchColor] = useState('');

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

        setSeeNewBranch(false)
    };

    return (
        <section>
            <button onClick={() => setSeeNewBranch(!seeNewBranch)}>Back</button>
            <div className={styles.new_tasks}>
                <div className={styles.new_task}>
                    <h3>Branch</h3>
                    <input style={{color: !branchColor ? null : branchColor}}
                    onChange={(e) => setBranchName(e.target.value)} type='text' placeholder='Branch'/>
                </div>
                <div className={styles.new_task}>
                    <h3>Color</h3>
                    <CirclePicker onChange={(color) => setBranchColor(color.hex)}/>
                </div>
                <button onClick={() => submitBranch(branchName, branchColor, session.uid)}
                className={styles.button}>Create branch</button>
            </div>
        </section>
    )
}