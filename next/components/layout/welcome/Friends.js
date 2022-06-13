import styles from './Friends.module.css'

export default function Friends(){
    return (
        <div className={styles.friends}>
            <div className={styles.friends_header}>
                <h2>Friends</h2>
            </div>
            <div className={styles.friends_container}>
                {/* {activities.map((r) => <Activity key={r.id} activity={r.data()}/>)} */}
            </div>
        </div>
    )
}