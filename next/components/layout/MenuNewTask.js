import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './MenuNewTask.module.css'

export default function MenuNewTask({group, session, seeNewTask, setSeeNewTask}){
    const [branches, setBranches] = useState([])

    const [task, setTask] = useState('')
    const [taskNote, setTaskNote] = useState('')
    const [taskBranch, setTaskBranch] = useState('')
    const [taskColor, setTaskColor] = useState('')

    function submitTask(task, note, completed, owner, branch, color){
        let collRef = collection(db, `groups/${group}/tasks`)
        let docRef = doc(collRef)

        setDoc(docRef, {
            task,
            note,
            completed,
            owner,
            branch,
            color,
            createdAt: serverTimestamp(),
        })

        setTask('')
        setTaskNote('')
        setTaskBranch('')
        setTaskColor('')

        setSeeNewTask(false)
    }

    if(group != null){
        useEffect(() => {
            const unsubscribe = onSnapshot(collection(db, `groups/${group}/branches`), 
            (snapshot) => {
              setBranches(snapshot.docs)
            })
            return () => {
                unsubscribe()
            }
    }, [group])
    }

    return (
        <div className={styles.new}>
            <div className={styles.new_options}>
                <div className={`${styles.new_button} ${(!task || !taskNote || !taskBranch ) ? styles.disabled : '' }`}>
                    <button 
                    disabled={!task || !taskNote || !taskBranch}
                    onClick={() => submitTask(task, taskNote, false, session.uid, taskBranch, taskColor)}
                    className={styles.new_create}>Create task</button>
                </div>
                <div className={styles.new_button}>
                    <button onClick={() => setSeeNewTask(!seeNewTask)}>Menu</button>
                </div>
            </div>

            <div className={styles.new_task}>
                <p>Task</p>
                <textarea
                onChange={(e) => setTask(e.target.value)}></textarea>
            </div>
            <div className={styles.new_note}>
                <p>Note</p>
                <textarea
                onChange={(e) => setTaskNote(e.target.value)}></textarea>
            </div>
            <div className={styles.new_branch}>
                {/* <p>Branch</p> */}
                <select style={{color: taskColor}}
                onChange={(e) => {
                    const task = JSON.parse(e.target.value)
                    setTaskBranch(task.branch)
                    setTaskColor(task.color)
                }}>
                    {branches.map((branch) => {
                        return <option key={branch.id} style={{color: branch.data().color}} 
                                value={`{"color": "${branch.data().color}", "branch": "${branch.data().branch}"}`}
                                >@{branch.data().branch}</option>
                    })}
                </select>
            </div>
        </div>
    )
}