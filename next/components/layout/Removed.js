import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

import ReactLoading from 'react-loading';

export default function Removed({group, styles}){
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(true)

        useEffect(() => {
            if(group != null){
                const unsubscribe = onSnapshot(query(collection(db, `groups/${group}/tasks`), where('deleted', '==', true), orderBy('deletedAt', 'desc')), 
                (snapshot) => {
                  setTasks(snapshot.docs)
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

    if(tasks?.length <= 0)
        return (
            <div className={styles.content}>
                <div className={styles.empty}>
                    <p>There are no removed tasks!</p>
                </div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.checked}>
            {tasks?.map(task => {
                return <Task key={task.id} task={task} disabled={true}/>
            })}
            </div>
        </div>
    )
}