import React, { useRef, useState } from "react";

import styles from './NewGroupModal.module.css';

import { db, storage } from '../../firebase';

import { nanoid } from 'nanoid'

import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "@firebase/storage"

import { AiOutlineClose } from "react-icons/ai";

import { useRouter } from "next/router";

export default function NewGroupModal({session, close}){

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [overview, setOverview] = useState('')
    const [picture, setPicture] = useState(null)

    const filePicker = useRef(null)

    const router = useRouter()

    // Let users upload their group pictures
    // and set it in the 'picture' field down
    // in the createGroup function
    function addPicture(e){
    
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])

        reader.onload = (e) => {
            setPicture(e.target.result)
        }
    }

    function createGroup(name, description, overview, owner){
        // Upload the picture (in the 'picture' variable)
        // to the storage, after that, insert the picture URL
        // in the document below
        const imgRef = ref(storage, `groups/${nanoid()}`)

        uploadString(imgRef, picture, 'data_url').then((snapshot) =>{
            getDownloadURL(imgRef)
            .then((URL) => {
                addDoc(collection(db, 'groups'), {
                    name,
                    description,
                    overview,
                    owner,
                    picture: URL,
                    members: [session.uid],
                    createdAt: serverTimestamp()
                }).then(group => {
                    let collRef = collection(db, `${group.path}/branches`)
                    let docRef = doc(collRef)

                    setDoc(docRef, {
                        branch: 'none',
                        color: '#969696',
                        owner: null,
                        createdAt: serverTimestamp()
                    })

                    router.push(`/g/${group.id}`)
                })
            })
        })

        close(false)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.header} onClick={() => close(false)}>
                    <h3>Create a new group</h3>
                    <div className={styles.close}>
                        <AiOutlineClose className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <strong>Choose a name for your group</strong>
                    <input type='text' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <strong>Give a short description about your group</strong>
                    <input type='text' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <strong>General overview/rules</strong>
                    <textarea onChange={(e) => setOverview(e.target.value)}/>
                </div>
                <div className={styles.container}>
                    <input type='file' ref={filePicker} hidden onChange={addPicture}/>
                    <div className={styles.add} onClick={() => filePicker.current.click()}>
                        <strong>Click to select group image</strong>
                        { picture ? (<img className={styles.preview} src={picture}/>) : (<div className={styles.empty_preview}></div>) }
                    </div>
                </div>
                <div className={styles.submit}>
                    <button className={styles.button} 
                    disabled={(!name || !description || !overview || !picture)} 
                    onClick={() => createGroup(name, description, overview, session.uid)}
                    >Create Group</button>
                </div>
            </div>
        </div>
    )
}