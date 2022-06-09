import React, { useRef, useState } from "react";

import styles from './NewGroupModal.module.css';

import { db, storage } from '../../firebase';

import { nanoid } from 'nanoid'

import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "@firebase/storage"

import { AiOutlineClose } from "react-icons/ai";

import { useRouter } from "next/router";

import { GroupContext } from "../../contexts/GroupContext";

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
                    onClick={() => createGroup(name, description, overview, session.uid, session.username)}
                    >Create Group</button>
                </div>
            </div>
        </div>
    )
}