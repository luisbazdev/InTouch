import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './NewTaskModal.module.css'

import Select from 'react-select'

import ReactLoading from 'react-loading';

import { AiOutlineClose } from 'react-icons/ai';


export default function NewTaskModal({session, group, close}){

    const [loading, setLoading] = useState(true)

    const [branches, setBranches] = useState([])
    const [options, setOptions] = useState([])

    const [task, setTask] = useState('')
    const [taskNote, setTaskNote] = useState('')
    const [taskBranch, setTaskBranch] = useState('')
    const [taskColor, setTaskColor] = useState('')

    function submitTask(task, note, completed, ownerId, ownerName, branch, color){
        let collRef = collection(db, `groups/${group.id}/tasks`)
        let docRef = doc(collRef)

        setDoc(docRef, {
            task,
            note,
            completed,
            ownerId,
            ownerName,
            branch,
            color,
            groupId: group.id,
            groupName: group.name,
            deleted: false,
            lastModifiedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        })

        setTask('')
        setTaskNote('')
        setTaskBranch('')
        setTaskColor('')

        close(false)
    }

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(collection(db, `groups/${group.id}/branches`), 
            (snapshot) => {
              setBranches(snapshot.docs)
              setLoading(false)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [group])

    useEffect(() => {
        
        const opts = []

        branches.forEach(branch => {
            opts.push({value: branch.data().branch, label: `@${branch.data().branch}`, color: branch.data().color})
        });

        setOptions(opts)

    }, [branches])

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
                border: '2px solid #8589cc',
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
                <div className={styles.header}>
                    <h3>Create a new task</h3>
                    <div className={styles.close} onClick={() => close(false)} >
                        <AiOutlineClose className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <strong>Choose a branch</strong>
                    <Select options={options} styles={selectStyles} onChange={(task) => {
                        setTaskBranch(task.value)
                        setTaskColor(task.color)
                    }}/>
                </div>
                <div className={styles.container}>
                    <strong>What's the task?</strong>
                    <input type='text' onChange={(e) => setTask(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <strong>Optional notes</strong>
                    <textarea onChange={(e) => setTaskNote(e.target.value)}/>
                </div>
                <div className={styles.submit}>
                    <button 
                    disabled={(!task || !taskBranch || !taskColor)}
                    onClick={() => submitTask(task, taskNote, false, session.uid, session.username, taskBranch, taskColor)}
                    >Create</button>
                </div>
            </div>
        </div>
    )
}