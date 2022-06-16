import React, { useRef, useState } from "react";

import { nanoid } from 'nanoid'

import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "@firebase/storage"

import { db, storage } from '../../firebase';

import { BiImageAdd } from 'react-icons/bi'

import { useRouter } from "next/router";

import { GroupContext } from "../../contexts/GroupContext";

import styles from './NewGroupModal.module.css';

export default function NewGroupModal({session, close}){

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [overview, setOverview] = useState('')
    const [picture, setPicture] = useState(null)

    const { setGroup } = React.useContext(GroupContext)

    const filePicker = useRef(null)

    const router = useRouter()

    function addPicture(e){
    
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])

        reader.onload = (e) => {
            setPicture(e.target.result)
        }
    }

    function createGroup(name, description, overview, ownerId, ownerName){
        const imgRef = ref(storage, `groups/${nanoid()}`)

        uploadString(imgRef, picture, 'data_url').then((snapshot) => {
            getDownloadURL(imgRef)
            .then((URL) => {
                addDoc(collection(db, 'groups'), {
                    name,
                    description,
                    overview,
                    ownerId,
                    ownerName,
                    picture: URL,
                    members: [session.uid],
                    createdAt: serverTimestamp()
                }).then(group => {
                    const collRef = collection(db, `${group.path}/branches`)
                    const docRef = doc(collRef)

                    setDoc(docRef, {
                        branch: 'none',
                        color: '#969696',
                        owner: null,
                        createdAt: serverTimestamp()
                    })

                    const collRef2 = collection(db, `users/${session.uid}/groups`)
                    const userRef = doc(collRef2);

                    setDoc(userRef, {
                        groupId: group.id,
                        joinedAt: serverTimestamp()
                    })

                    setGroup({name, id: group.id})
                    router.push(`/g/${group.id}`)
                })
            })
        })

        close(false)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Create a new group</h3>
                </div>
                <div className={styles.container}>
                    <input type='text' placeholder="Title" 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <input type='text' placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <textarea placeholder="General overview" onChange={(e) => setOverview(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <input type='file' ref={filePicker} hidden onChange={addPicture}/>
                    <h4>Picture</h4>
                    <div className={styles.add}>
                        { picture ? (<img className={styles.preview} src={picture}/>) : (<div className={styles.empty_preview}></div>)}
                        <div className={styles.add_button} onClick={() => filePicker.current.click()}>
                            <BiImageAdd/>
                            <small>Add image</small>
                        </div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <small className={styles.cancel}
                    disabled={(!name || !description || !overview || !picture)} 
                    onClick={() => close(false)}
                    >Cancel</small>
                    <small className={styles.confirm}
                    disabled={(!name || !description || !overview || !picture)} 
                    onClick={() => createGroup(name, description, overview, session.uid, session.username)}
                    >Confirm</small>
                </div>
            </div>
        </div>
    )
}