import React, { useEffect, useState } from 'react';

import { VscCheck, VscAdd, VscChromeClose } from "react-icons/vsc";

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

import { WelcomeContext } from '../../../contexts/WelcomeContext';

import styles from './Activity.module.css'

export default function Activity({activity}){
    
    const [profilePicture, setProfilePicture] = useState()
    
    const { setPreview } = React.useContext(WelcomeContext)

    useEffect(() => {
        async function fetchProfilePicture(){
            const userRef = doc(db, "users", activity.ownerId);
            const userSnap = await getDoc(userRef);
        
            const _profilePicture = userSnap.data().picture
    
            setProfilePicture(_profilePicture)
        }

        fetchProfilePicture()
    }, [])

    function switchActivity(){
            switch(true){
                case (activity.completed == true):
                    return (
                    <div className={styles.activity}>
                        <VscCheck className={styles.checked}/>
                        <div className={styles.info}>
                            <p className={styles.activity_title} onClick={() => setPreview(activity)}><strong>{activity.task}</strong> › {activity.groupName}</p>
                            <div className={styles._info}>
                                <img src={profilePicture} className={styles.userPic}/>
                                <small>{activity.ownerName} · </small>
                                <small>{activity.lastModifiedAt.toDate().toLocaleTimeString()}</small>
                            </div>
                        </div>
                    </div>)
                case (activity.deleted == true):
                    return (
                    <div className={styles.activity}>
                        <VscChromeClose className={styles.deleted}/>
                        <div className={styles.info}>
                            <p className={styles.activity_title} onClick={() => setPreview(activity)}><strong>{activity.task}</strong> › {activity.groupName}</p>
                            <div className={styles._info}>
                                <img src={profilePicture} className={styles.userPic}/>
                                <small>{activity.ownerName} · </small>
                                <small>{activity.lastModifiedAt.toDate().toLocaleTimeString()}</small>
                            </div>
                        </div>
                    </div>)
                default:
                    return (
                    <div className={styles.activity}>
                        <VscAdd className={styles.created}/>
                        <div className={styles.info}>
                            <p className={styles.activity_title} onClick={() => setPreview(activity)}><strong>{activity.task}</strong> › {activity.groupName}</p>
                            <div className={styles._info}>
                                <img src={profilePicture} className={styles.userPic}/>
                                <small>{activity.ownerName} · </small>
                                <small>{activity.lastModifiedAt.toDate().toLocaleTimeString()}</small>
                            </div>
                        </div>
                    </div>)
            }
    }

    return (
        <div>
            {switchActivity()}
        </div>
    )
}