import React, { useState, useEffect } from 'react';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import styles from './NewTaskModal.module.css'

import Select from 'react-select'

// import ReactLoading from 'react-loading';

// import { AiOutlineClose } from 'react-icons/ai';


export default function NewTaskModal({session, group, close, back}){

    // const [loading, setLoading] = useState(true)

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
            //   setLoading(false)
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
                border: 'none',
                borderRadius: '10px'
            }
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h3>Create a new task</h3>
            </div>
            <div className={styles.container}>
                <input type='text' placeholder='Task' onChange={(e) => setTask(e.target.value)}/>
            </div>
            <div className={styles.container}>
                <textarea placeholder='Notes' onChange={(e) => setTaskNote(e.target.value)}/>
            </div>
            <div className={styles.container}>
                <Select placeholder={'Choose a branch'} options={options} styles={selectStyles} onChange={(task) => {
                    setTaskBranch(task.value)
                    setTaskColor(task.color)
                }}/>
            </div>
            <div className={styles.submit}>
                <small className={styles.back}
                onClick={back}
                >Back</small>
                <small className={styles.cancel}
                onClick={() => close(false)}
                >Cancel</small>
                <small className={styles.confirm}
                disabled={(!name || !description || !overview || !picture)} 
                // onClick={() => submitBranch(branchName, branchColor, session.uid, session.username)}
                >Confirm</small>
            </div>
        </div>
    )
}