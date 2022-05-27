import styles from './MenuMain.module.css'

export default function MenuMain({seeNewTask, setSeeNewTask, seeNewBranch, setSeeNewBranch}){
    return (
        <div className={styles.info}>
            <div className={styles.options}>
                <div className={styles.button}>
                    <button onClick={() => setSeeNewTask(!seeNewTask)}>Create new task</button>
                </div>
                <div className={styles.button}>
                    <button onClick={() => setSeeNewBranch(!seeNewBranch)}>Create new branch</button>
                </div>
            </div>
            <p className={styles.overview}>
            This is our InTouch group to maintain all of our tasks synced. Please don't create new tasks
            before checking if someone already finished them.
            </p>
        </div>
    )
}