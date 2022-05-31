import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './NewTaskModal.module.css'

import Select from 'react-select'

import ReactLoading from 'react-loading';

export default function NewTaskModal({session, group, close}){

    const [loading, setLoading] = useState(true)

    const [branches, setBranches] = useState([])
    const [options, setOptions] = useState([])

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

        close(false)
    }

    useEffect(() => {
        
        const opts = []

        branches.forEach(branch => {
            opts.push({value: branch.data().branch, label: `@${branch.data().branch}`, color: branch.data().color})
        });

        setOptions(opts)

    }, [branches])

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(collection(db, `groups/${group}/branches`), 
            (snapshot) => {
              setBranches(snapshot.docs)
              setLoading(false)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [group])

    const selectStyles = {
        singleValue: (styles, {data}) => ({...styles, color: data.color}),
        // option: (styles, {data}) => ({...styles, color: data.color})
        option: (styles, {data}) => {
            return {
                ...styles,
                color: data.color,
                backgroundColor: 'transparent'
            }
        },
        control: (styles) => {
            return {
                ... styles,
                padding: '2px 2px',
                border: '2px solid #5add5a',
                borderRadius: '10px'
            }
        }
    }

    if(loading)
    return (
        <div className={styles.bg}>
            <div className={styles.loading}>
                <ReactLoading type='spin' color='#33be33'/>
            </div>
        </div>
    )

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <button onClick={() => close(false)}>Close</button>
                <div className={styles.header}>
                    <h3>Create A New Task</h3>
                </div>
                <div className={styles.container}>
                    <p>Branch</p>
                    <Select options={options} styles={selectStyles} onChange={(task) => {
                        setTaskBranch(task.value)
                        setTaskColor(task.color)
                    }}/>
                </div>
                <div className={styles.container}>
                    <p>Task</p>
                    <input type='text' onChange={(e) => setTask(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <p>Note</p>
                    <textarea onChange={(e) => setTaskNote(e.target.value)}/>
                </div>
                <div className={styles.submit}>
                    <button onClick={() => submitTask(task, taskNote, false, session.uid, taskBranch, taskColor)}>Create</button>
                </div>
            </div>
        </div>
    )
}