import { FaHome, FaCheck, FaCodeBranch } from "react-icons/fa";

import styles from './NavBar.module.css'

export default function NavBar({setSeeHome, setSeeChecked, setSeeBranches, disabled}){
    return (
        <div className={styles.navbar}>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(true)
                setSeeChecked(false)
                setSeeBranches(false)
            }}>
                <FaHome className={styles.icon}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => { 
                setSeeHome(false)
                setSeeChecked(true)
                setSeeBranches(false)
            }}>
                <FaCheck className={styles.icon}/>
            </div>
            <div className={styles.icon_container}
            onClick={() => {
                setSeeHome(false)
                setSeeChecked(false)
                setSeeBranches(true)
            }} >
                <FaCodeBranch className={styles.icon}/>
            </div>
        </div>
    )
}