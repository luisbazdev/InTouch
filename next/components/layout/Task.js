import styles from './Task.module.css'

export default function Task({task, selected, selectedTasks, setSelected, disabled}){
    // return (
    //     <div className={styles.task}>
    //         <div className={`${styles.task_card} ${selected ? styles.selected : false}`} 
    //         onClick={() => !disabled ? (selected ? setSelected([...selectedTasks].filter(t => t.id != task.id)) : setSelected([...selectedTasks, task])) : (null)}
    //         >
    //             <p className={styles.task_branch} style={{color: task.data().color}}>@{task.data().branch}</p>

    //             <div className={styles.contain}>
    //                 <div className={styles.task_content} style={{backgroundColor: task.data().color}}>
    //                     <p className={styles.task_task}>{task.data().task}</p>
    //                 </div>
    //                 <div className={styles.task_note}>
    //                     <p className={styles.task_note_note}>{task.data().note}</p>                 
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div 
        className={`${styles.task} ${selected ? styles.task_selected : ''}`}
        onClick={() => !disabled ? (selected ? setSelected([...selectedTasks].filter(t => t.id != task.id)) : setSelected([...selectedTasks, task])) : (null)}
        >
            <div 
            className={styles.task_header}
            style={{backgroundColor: task.data().color}}>
              <p className={styles.task_branch}>@{task.data().branch}</p>
              <p className={styles.task_desc}>{task.data().task}</p>
            </div>
            <div className={styles.task_body}>
              <p className={styles.task_note}>{task.data().note}</p>
            </div>
        </div>
    )
}



