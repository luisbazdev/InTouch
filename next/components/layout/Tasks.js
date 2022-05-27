import React, { useEffect, useState } from 'react'

import { doc, updateDoc, collection, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

export default function Tasks({group, styles}){
    const [tasks, setTasks] = useState(null)
    const [selected, setSelected] = useState(null)

    function finish(id){
        const taskRef = doc(db, 'groups', `${group}/tasks/${id}`);

        updateDoc(taskRef, {
            completed: true,
            finishedAt: serverTimestamp()
        })
    }

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query(collection(db, `groups/${group}/tasks`), where('completed', '==', false), orderBy('createdAt', 'desc')), 
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
            <div className={styles.empty}>
                <p>There are no tasks to complete yet!</p>
            </div>
        )

    return (
        <div className={styles.tasks}>
            {tasks?.map(task => {
                return <Task key={task.id} task={task} selected={selected == task.id} setSelected={setSelected} finish={finish}/>
            })}
        </div>
    )
}