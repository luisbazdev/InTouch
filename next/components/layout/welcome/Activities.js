import React, { useState, useEffect } from "react"

import { onSnapshot, query, where, Timestamp, orderBy, collectionGroup } from 'firebase/firestore';
import { db } from '../../../firebase';

import { AuthContext } from "../../../contexts/AuthContext";
import { WelcomeContext } from "../../../contexts/WelcomeContext";

import Activity from './Activity'

import styles from './Activities.module.css'

export default function Activities({session}){

    const { userGroups } = React.useContext(AuthContext)
    const { setPreview } = React.useContext(WelcomeContext)

    const [activities, setActivities] = useState([])

    useEffect(() => {
        if(session != null && userGroups.length > 0){
            const today = new Date(Timestamp.now().toMillis() - (24 * 60 * 60 * 1000))

            const unsubscribe = onSnapshot(
            query(collectionGroup(db, `tasks`), 
            where('groupId', 'in', userGroups), 
            where('lastModifiedAt', '>', today), 
            orderBy('lastModifiedAt', 'desc'),
            ),
            (snapshot) => {
              setActivities(snapshot.docs)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [session, userGroups])

    useEffect(() => {
        if(activities.length > 0)
            setPreview(activities[0].data())
    }, [session, activities])

    return (
        <div className={styles.activities}>
            <div className={styles.activities_header}>
                <h2>Activity</h2>
            </div>
            <div className={styles.activities_container}>
                {activities.map((r) => <Activity key={r.id} activity={r.data()}/>)}
            </div>
        </div>
    )
}