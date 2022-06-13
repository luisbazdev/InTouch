import Task from '../Task'

import styles from './Preview.module.css'

export default function Preview({preview}){
    return (
        <div className={styles.preview}>
            <div className={styles.preview_header}>
                <h2>Preview</h2>
            </div>
            <div className={styles.preview_container}>
                <Task task={preview || null} preview={true}/>
            </div>
        </div>

    )
}