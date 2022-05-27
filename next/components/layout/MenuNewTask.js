import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

export default function MenuNewTask({group, styles, session, seeNewTask, setSeeNewTask}){
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
        <section>
            <button onClick={() => setSeeNewTask(!seeNewTask)}>Back</button>
            <div className={styles.new_tasks}>
                <div className={styles.new_task}>
                    <h3>Task</h3>
                    <textarea onChange={(e) => setTask(e.target.value)} cols='30' rows='5'></textarea>
                </div>
                <div className={styles.new_task}>
                    <h3>Note</h3>
                    <textarea onChange={(e) => setTaskNote(e.target.value)} cols='30' rows='8'></textarea>
                </div>
                <div className={styles.new_task}>
                    <h3>Branch</h3>
                    <select onChange={(e) => {
                        const task = JSON.parse(e.target.value)
                        setTaskBranch(task.branch)
                        setTaskColor(task.color)
                    }}>
                        {branches.map((branch) => {
                            return <option key={branch.id} style={{color: branch.data().color}} 
                                    value={`{"color": "${branch.data().color}", "branch": "${branch.data().branch}"}`}
                                    >{branch.data().branch}</option>
                        })}
                    </select>
                </div>
                <button onClick={() => submitTask(task, taskNote, false, session.uid, taskBranch, taskColor)}
                className={styles.button}>Create task</button>
            </div>
        </section>
    )
}