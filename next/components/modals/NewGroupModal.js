import React, { useState } from "react";

import styles from './NewGroupModal.module.css';

import { db, storage } from '../../firebase';

import { nanoid } from 'nanoid'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "@firebase/storage"

import { AiOutlineClose } from "react-icons/ai";

import { useRouter } from "next/router";

export default function NewGroupModal({session, close}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [picture, setPicture] = useState(null)

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

    function createGroup(name, description, owner){
        // Upload the picture (in the 'picture' variable)
        // to the storage, after that, insert the picture URL
        // in the document below
        const imgRef = ref(storage, `groups/${nanoid()}`)

        uploadString(imgRef, picture, 'data_url').then((snapshot) =>{
            // console.log(snapshot)
            getDownloadURL(imgRef)
            .then((URL) => {
                addDoc(collection(db, 'groups'), {
                    name,
                    description,
                    owner,
                    picture: URL,
                    members: [session.uid],
                    createdAt: serverTimestamp()
                }).then(group => router.push(`/g/${group.id}`))
            })
        })

        close(false)
        // redirect the user to the new group
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.close} onClick={() => close(false)} >
                    <AiOutlineClose className={styles.icon}/>
                </div>
                <div className={styles.option}>
                    <h3>Group Name</h3>
                    <input type='text' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.option}>
                    <h3>Group Description</h3>
                    <textarea rows='12' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className={styles.option}>
                    <h3>Group Image</h3>
                    <input type='file' onChange={addPicture}/>
                </div>
                <button className={styles.button} onClick={() => createGroup(name, description, session.uid)}>Create Group</button>
            </div>
        </div>
    )
}