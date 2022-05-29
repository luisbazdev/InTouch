import React, { useState, useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

import Branch from './Branch'

export default function Branches({group, styles}){
    const [branches, setBranches] = useState([])

        useEffect(() => {
            if(group != null){
                const unsubscribe = onSnapshot(collection(db, `groups/${group}/branches`), 
                (snapshot) => {
                  setBranches(snapshot.docs)
                })

                return () => {
                    unsubscribe()
                }
            }
    }, [group])
    
    if(branches?.length <= 0)
        return (
            <div className={styles.empty}>
                <p>There are no branches yet!</p>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.branches}>
                {branches?.map(branch => {
                    return <Branch key={branch.id} branch={branch}/>
                })}
            </div>
        </div>

    )
}