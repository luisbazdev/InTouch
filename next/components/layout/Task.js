import styles from './Task.module.css'

export default function Task({task, selected, selectedTasks, setSelected, disabled}){
    return (
        <div className={styles.task}>
            <div className={styles.task_details}>
                <p className={styles.task_branch} style={{color: task.data().color}}>@{task.data().branch}</p>
                {/* <p>3/5/22 7:45 P.M.</p> */}
                {/* <p>{task?.data().createdAt?.toDate()}</p> */}
            </div>
            <div className={`${styles.task_card} ${selected ? styles.selected : false}`} 
            // onClick={() => {
            //     if(selected){
            //         setSelected([...selectedTasks].filter(t => t.id != task.id))
            //     }
            //     else{
            //         setSelected([...selectedTasks, task])
            //     }
            // }}
            onClick={() => !disabled ? (selected ? setSelected([...selectedTasks].filter(t => t.id != task.id)) : setSelected([...selectedTasks, task])) : (null)}
            >
                <div className={styles.contain}>
                    <div className={styles.task_content} style={{backgroundColor: task.data().color}}>
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


