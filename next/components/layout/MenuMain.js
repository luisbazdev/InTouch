import styles from './MenuMain.module.css'

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

export default function MenuMain({setSeeNewTaskModal, setSeeNewBranchModal}){
    return (
        <div className={styles.info}>
            <div className={styles.options}>

                <div className={styles.button}>
                    <AiOutlinePlus/>
                    <button onClick={() => setSeeNewTaskModal(true)}>New task</button>
                </div>
                <div className={styles.button}>
                    <AiOutlinePlus/>
                    <button onClick={() => setSeeNewBranchModal(true)}>New branch</button>
                </div>
            </div>
            <p className={styles.overview}>
            This is our InTouch group to maintain all of our tasks synced. Please don't create new tasks
            before checking if someone already finished them.
            </p>
        </div>
    )
}