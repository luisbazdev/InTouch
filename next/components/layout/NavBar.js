import { FaHome, FaCheck, FaCodeBranch, FaTrash } from "react-icons/fa";

import styles from './NavBar.module.css'

export default function NavBar({seeHome, setSeeHome, seeChecked, setSeeChecked, seeBranches, setSeeBranches, seeRemoved, setSeeRemoved}){
    return (
        <div className={styles.navbar}>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(true)
                setSeeChecked(false)
                setSeeBranches(false)
                setSeeRemoved(false)
            }}>
                <FaHome className={`${styles.icon} ${seeHome ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(false)
                setSeeChecked(true)
                setSeeBranches(false)
                setSeeRemoved(false)
            }}>
                <FaCheck className={`${styles.icon} ${seeChecked ? styles.selected : ''}`}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(false)
                setSeeChecked(false)
                setSeeBranches(false)
                setSeeRemoved(true)
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
            }} >
                <FaCodeBranch className={`${styles.icon} ${seeBranches ? styles.selected : ''}`}/>
            </div>
        </div>
    )
}