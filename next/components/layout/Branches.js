import React, { useState, useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

import Branch from './Branch'

import ReactLoading from 'react-loading';

export default function Branches({group, styles}){
    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(collection(db, `groups/${group.id}/branches`), 
            (snapshot) => {
              setBranches(snapshot.docs)
              setLoading(false)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [group])
    
    if(loading)
        return (
            <div className={styles.loading}>
                <ReactLoading type='spin' color='#33be33'/>
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