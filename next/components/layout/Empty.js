import styles from './Empty.module.css'

import { AiOutlinePlus } from 'react-icons/ai'

export default function Empty({section, setSeeNewTaskModal}){

    return (
        <div className={styles.empty}>
            <div className={styles.empty_container}>
                <h3>Nothing was found in this section</h3>
                {(section == 'tasks') && <div className={styles.empty_button}>
                    <AiOutlinePlus onClick={() => setSeeNewTaskModal(true)}/>
                </div>}
            </div>
        </div>
    )
}