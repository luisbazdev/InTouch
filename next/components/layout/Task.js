import styles from './Task.module.css'

import {FaCheck} from 'react-icons/fa'

export default function Task({task, selected, setSelected, finish}){
    return (
        <div className={styles.task}>
            <div className={styles.task_details}>
                <p className={styles.task_branch} style={{color: task.data().color}}>@{task.data().branch}</p>
                {/* <p>3/5/22 7:45 P.M.</p> */}
                {/* <p>{task?.data().createdAt?.toDate()}</p> */}
            </div>
            <div className={styles.task_card} onClick={() => setSelected(task.id)}>
                <div className={styles.contain}>
                    <div className={styles.task_content} style={{backgroundColor: task.data().color}}>
                        { selected && 
                        <div className={styles.task_finish_container} style={{backgroundColor: task.data().color}}>
                            <FaCheck className={styles.task_finish} onClick={() => finish(task.id)}/>
                        </div>
                        }
                        <p className={styles.task_task}>{task.data().task}</p>
                    </div>
                    <div className={styles.task_note}>
                        <p className={styles.task_note_note}>{task.data().note}</p>                 
                    </div>
                </div>
            </div>
        </div>
    )
}


