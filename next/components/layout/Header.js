import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where, documentId} from "firebase/firestore";
import { db } from '../../firebase';

import styles from './Header.module.css'

export default function Header({group}){
    const [data, setData] = useState([])

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query((collection(db, 'groups')), where(documentId(), '==', group)), 
            (snapshot) => {
              setData(snapshot.docs)
            })

        return () => {
            unsubscribe()
        }
    }
    }, [group])
    


    return (
        <div className={styles.header}>
            <h2>{data[0]?.data().name}</h2>
            <p>{data[0]?.data().description}</p>
        </div>
    )
}