import React from 'react'

import { BiTime, BiCheckSquare, BiXCircle, BiGitBranch, BiGroup } from 'react-icons/bi'
import { FiSettings, FiPlusCircle } from 'react-icons/fi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

import styles from './NavBar.module.css'

import { GroupContext } from "../../contexts/GroupContext";

export default function NavBar({
    seeHome, setSeeHome, 
    seeChecked, setSeeChecked, 
    seeBranches, setSeeBranches, 
    seeRemoved, setSeeRemoved,
    seeMembers, setSeeMembers}){

    const { setSeeAddMemberModal, setSeeNewTaskModal, setSeeNewBranchModal } = React.useContext(GroupContext)
    
    return (
        <div className={styles.navbar}>
            
            <div className={styles.navbar_buttons}>
                <div className={styles.navbar_options} onClick={setSeeNewTaskModal}>
                    <div className={styles.navbar_button}>
                        <FiPlusCircle/>
                        <small>Create</small>
                    </div>
                </div>
                <div className={styles.navbar_options} onClick={setSeeAddMemberModal}>
                    <div className={styles.navbar_button}>
                        <AiOutlineUsergroupAdd/>
                        <small>Invite</small>
                    </div>
                </div>
            </div>

            <div className={styles.navbar_section}>
                <p>TO-DO</p>
                <div className={styles.navbar_options}>
                    <div className={`${styles.navbar_option} ${seeHome ? styles.navbar_selected : ''}`} onClick={() => {
                        setSeeHome(true)
                        setSeeChecked(false)
                        setSeeRemoved(false)
                        setSeeBranches(false)
                        }}>
                        <BiTime className={styles.navbar_icon}/>
                        <small>Pending</small>
                    </div>
                    <div className={`${styles.navbar_option} ${seeChecked ? styles.navbar_selected : ''}`} onClick={() => {
                        setSeeHome(false)
                        setSeeChecked(true)
                        setSeeRemoved(false)
                        setSeeBranches(false)
                        }}>
                        <BiCheckSquare className={styles.navbar_icon}/>
                        <small>Finished</small>
                    </div>
                    <div className={`${styles.navbar_option} ${seeRemoved ? styles.navbar_selected : ''}`} onClick={() => {
                        setSeeHome(false)
                        setSeeChecked(false)
                        setSeeRemoved(true)
                        setSeeBranches(false)
                        }}>
                        <BiXCircle className={styles.navbar_icon}/>
                        <small>Cancelled</small>
                    </div>
                </div>
            </div>

            <div className={styles.navbar_section}>
                <p>TEAM</p>
                <div className={styles.navbar_options}>
                    <div className={`${styles.navbar_option} ${seeBranches ? styles.navbar_selected : ''}`} onClick={() => {
                        setSeeHome(false)
                        setSeeChecked(false)
                        setSeeRemoved(false)
                        setSeeBranches(true)
                        }}>
                        <BiGitBranch/>
                        <small>Branches</small>
                    </div>
                    <div className={styles.navbar_option}>
                        <BiGroup/>
                        <small>Members</small>
                    </div>
                    <div className={styles.navbar_option}>
                        <FiSettings/>
                        <small>Settings</small>
                    </div>
                </div>
            </div>

        </div>
    )
}