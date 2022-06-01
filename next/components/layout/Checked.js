import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

import ReactLoading from 'react-loading';

import Masonry from 'react-masonry-css'

export default function Checked({group, styles}){
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(true)

        useEffect(() => {
            if(group != null){
                const unsubscribe = onSnapshot(query(collection(db, `groups/${group}/tasks`), where('completed', '==', true), orderBy('finishedAt', 'desc')), 
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
                    <p>There are no completed tasks yet!</p>
                </div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.checked}>
            <Masonry
                breakpointCols={2}
                className={styles.masonry_grid}
                columnClassName={styles.masonry_grid_column}>
                {tasks?.map(task => {
                    return <Task 
                    key={task.id} 
                    task={task}
                    disabled={true} 
                    />
                })}
            </Masonry>
            </div>
        </div>
    )
}