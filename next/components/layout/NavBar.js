import { FaHome, FaCheck, FaCodeBranch, FaTrash } from "react-icons/fa";
import { MdGroup } from 'react-icons/md'

import styles from './NavBar.module.css'

export default function NavBar({
    seeHome, setSeeHome, 
    seeChecked, setSeeChecked, 
    seeBranches, setSeeBranches, 
    seeRemoved, setSeeRemoved,
    seeMembers, setSeeMembers}){
    return (
        <div className={styles.navbar}>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(true)
                setSeeChecked(false)
                setSeeBranches(false)
                setSeeRemoved(false)
                setSeeMembers(false)
            }}>
                <FaHome className={`${styles.icon} ${seeHome ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(false)
                setSeeChecked(true)
                setSeeBranches(false)
                setSeeRemoved(false)
                setSeeMembers(false)
            }}>
                <FaCheck className={`${styles.icon} ${seeChecked ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(false)
                setSeeChecked(false)
                setSeeBranches(false)
                setSeeRemoved(true)
                setSeeMembers(false)
            }}
            >
                <FaTrash className={`${styles.icon} ${seeRemoved ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => {
                setSeeHome(false)
                setSeeChecked(false)
                setSeeBranches(true)
                setSeeRemoved(false)
                setSeeMembers(false)
            }} >
                <FaCodeBranch className={`${styles.icon} ${seeBranches ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => {
                setSeeHome(false)
                setSeeChecked(false)
                setSeeBranches(false)
                setSeeRemoved(false)
                setSeeMembers(true)
            }} >
                <MdGroup className={`${styles.icon} ${seeMembers ? styles.selected : ''}`}/>
            </div>
        </div>
    )
}