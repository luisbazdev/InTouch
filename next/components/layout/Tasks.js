import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

import { GroupContext } from "../../contexts/GroupContext";

import {FaCheck} from 'react-icons/fa'

export default function Tasks({group, styles}){
    const [tasks, setTasks] = useState(null)

    const { selected, setSelected, setSeeCheckModal } = React.useContext(GroupContext)

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

    // return (
    //     <div className={styles.tasks}>
    //         <button onClick={() => setSeeCheckModal(true)}>Check</button>
    //         {tasks?.map(task => {
    //             return <Task 
    //             key={task.id} 
    //             task={task} 
    //             selected={selected.find((t) => t.id == task.id)} 
    //             selectedTasks={selected} 
    //             setSelected={setSelected}/>
    //         })}
    //     </div>
    // )

    return (
        <div className={styles.content}>
            <div className={styles.buttons}>
                <div className={styles.button_check} onClick={() => setSeeCheckModal(true)}>
                    <FaCheck className={styles.button_check_icon}/>
                    <p>Check</p>
                </div>

            </div>
            <div className={styles.tasks}>
                {tasks?.map(task => {
                    return <Task 
                    key={task.id} 
                    task={task} 
                    selected={selected.find((t) => t.id == task.id)} 
                    selectedTasks={selected} 
                    setSelected={setSelected}/>
                })}
            </div>
        </div>
    )
}