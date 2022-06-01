import React, { useEffect, useRef, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

import { GroupContext } from "../../contexts/GroupContext";

import {FaCheck, FaTrash} from 'react-icons/fa'

import ReactLoading from 'react-loading';

export default function Tasks({group, styles}){
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkRef = useRef(null)
    const removeRef = useRef(null)

    const { selected, setSelected, setSeeCheckModal, setSeeRemoveModal } = React.useContext(GroupContext)

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query(collection(db, `groups/${group}/tasks`), where('completed', '==', false), where('deleted', '==', false), orderBy('createdAt', 'desc')), 
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
                    <p>There are no tasks to complete yet!</p>
                </div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.tasks}>
                <div className={styles.options}>
                    <div className={`${styles.button_check} ${selected.length <= 0 ? styles.disabled : ''}`}>
                        <FaCheck className={styles.button_check_icon} onClick={() => checkRef.current.click()}/>
                        <button 
                        hidden
                        ref={checkRef}
                        disabled={selected.length <= 0}
                        onClick={() => setSeeCheckModal(true)}></button>
                    </div>
                    <div className={`${styles.button_check} ${selected.length <= 0 ? styles.disabled : ''}`}>
                        <FaTrash className={styles.button_check_icon} onClick={() => removeRef.current.click()}/>
                        <button 
                        hidden
                        ref={removeRef}
                        disabled={selected.length <= 0}
                        onClick={() => setSeeRemoveModal(true)}></button>
                    </div>
                </div>
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