import React, { useEffect, useState } from 'react'

import { FaTasks } from 'react-icons/fa'
import { BiGitBranch } from 'react-icons/bi'

import NewTaskModal from './NewTaskModal'
import NewBranchModal from './NewBranchModal'

import styles from './CreateModal.module.css'

export default function CreateModal({session, group, close}){
    const [seeNewTaskModal, setSeeNewTaskModal] = useState(false)
    const [seeNewBranchModal, setSeeNewBranchModal] = useState(false)

    if(seeNewTaskModal)
        return (
        <div className={styles.bg}>
            <NewTaskModal session={session} group={group} close={close} back={() => setSeeNewTaskModal(false)}/>
        </div>
        )
        
    if(seeNewBranchModal)
        return (
        <div className={styles.bg}>
            <NewBranchModal session={session} group={group} close={close} back={() => setSeeNewBranchModal(false)}/>
        </div>
        )

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.create_task} onClick={() => setSeeNewTaskModal(true)}>
                    <h3>Create task</h3>
                    <FaTasks className={styles.icon}/>
                </div>
                <div className={styles.create_branch} onClick={() => setSeeNewBranchModal(true)}>
                    <h3>Create branch</h3>
                    <BiGitBranch className={styles.icon}/>
                </div>
                <div className={styles.submit}>   
                    <div className={styles.cancel} onClick={() => close(false)}>
                        <small>Cancel</small>
                    </div>
                </div>
            </div>
        </div>
    )
}