import React, { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

import styles from './Task.module.css'

export default function Task({task, selected, selectedTasks, setSelected, disabled}){
  const [profilePicture, setProfilePicture] = useState()

  useEffect(() => {
      async function fetchProfilePicture(){
          const userRef = doc(db, "users", task.ownerId);
          const userSnap = await getDoc(userRef);
      
          const _profilePicture = userSnap.data().picture
  
          setProfilePicture(_profilePicture)
      }

      fetchProfilePicture()
  }, [])

  return (
      <div className={`${styles.task_card}`}>
          <div className={styles.task_branch} style={{backgroundColor: task.color}}>
            <p>@{task.branch}</p>
          </div>
          <div className={styles.task_body}>
            <p className={styles.task_task}>{task.task}</p>
            <p className={styles.task_note}>{task.note}</p>
            <div className={styles.task_owner}>
              <img className={styles.userPic} src={profilePicture}/>
              <small>{task.ownerName} · {task?.createdAt?.toDate()?.toLocaleDateString()}</small>
            </div>
          </div>
      </div>
  )
}



