import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

export default function Checked({group, styles}){
    const [tasks, setTasks] = useState(null)

        useEffect(() => {
            if(group != null){
                const unsubscribe = onSnapshot(query(collection(db, `groups/${group}/tasks`), where('completed', '==', true), orderBy('finishedAt', 'desc')), 
                (snapshot) => {
                  setTasks(snapshot.docs)
                })

                return () => {
                    unsubscribe()
                }
            }
    }, [group])
    
    if(tasks?.length <= 0)
        return (
            <div className={styles.content}>
                <div className={styles.empty}>
                    <p>There are no completed tasks yet!</p>
                </div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.checked}>
            {tasks?.map(task => {
                return <Task key={task.id} task={task}/>
            })}
            </div>
        </div>
    )
}