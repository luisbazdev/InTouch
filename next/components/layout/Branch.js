import styles from './Branch.module.css'

export default function Branch({branch}){
    return (
        // <div>{branch.data().branch}</div>
        <div className={styles.branch}>
            <p style={{color: branch.data().color}}>@{branch.data().branch}</p>
        </div>
    )
}