import styles from './Branch.module.css'

export default function Branch({branch}){
    return (
        <div>{branch.data().branch}</div>
    )
}