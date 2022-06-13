import React, { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

import styles from './Task.module.css'

import { BsThreeDots } from 'react-icons/bs'

export default function Task({task, preview}){
  const [profilePicture, setProfilePicture] = useState()

  useEffect(() => {
    async function fetchProfilePicture(){
      const userRef = doc(db, "users", task?.ownerId);
      const userSnap = await getDoc(userRef);
  
      const _profilePicture = userSnap.data().picture

      setProfilePicture(_profilePicture)
    }

    if(task != null){
      fetchProfilePicture()
    }

  }, [])

  return (
      <div className={`${styles.task_card} ${preview ? styles.task_preview : null }`}>
          <BsThreeDots className={styles.task_options}/>
          <div className={styles.task_branch} style={{backgroundColor: task?.color}}>
            <p>@{task?.branch}</p>
          </div>
          <p className={styles.task_task}>{task?.task}</p>
          <div className={styles.task_body}>
            <p className={styles.task_note}>{task?.note}</p>
          </div>
          <div className={styles.task_owner}>
            <img className={styles.userPic} src={profilePicture}/>
            <small>{task?.ownerName} · {task?.createdAt?.toDate()?.toLocaleDateString()}</small>
          </div>
      </div>
  )
}



