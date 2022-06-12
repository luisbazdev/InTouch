import React, { useEffect, useRef, useState } from 'react'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Task from './Task'

import { GroupContext } from "../../contexts/GroupContext";

import { FaCheck, FaTrash } from 'react-icons/fa'

import ReactLoading from 'react-loading';

import Masonry from 'react-masonry-css'
import Empty from './Empty';

export default function Tasks({group, styles}){
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkRef = useRef(null)
    const removeRef = useRef(null)

    const { selected, setSelected, setSeeCheckModal, setSeeRemoveModal, setSeeNewTaskModal } = React.useContext(GroupContext)

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query(collection(db, `groups/${group.id}/tasks`), where('completed', '==', false), where('deleted', '==', false), orderBy('createdAt', 'desc')), 
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
        return <Empty section='tasks' setSeeNewTaskModal={setSeeNewTaskModal}/>

    return (
        <div className={styles.content}>
            <div className={styles.tasks}>
                <Masonry
                    breakpointCols={2}
                    className={styles.masonry_grid}
                    columnClassName={styles.masonry_grid_column}>
                    {tasks?.map(task => {
                        return <Task 
                        key={task.id} 
                        task={task.data()} 
                        selected={selected.find((t) => t.id == task.id)} 
                        selectedTasks={selected} 
                        setSelected={setSelected}/>
                    })}
                </Masonry>
            </div>
        </div>
    )
}