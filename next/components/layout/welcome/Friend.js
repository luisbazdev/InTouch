import { BsThreeDots } from 'react-icons/bs'

import styles from './Friend.module.css'

export default function Friend({friend}){
    return (
        <div className={styles.friend_card}>
            <img src={friend.picture} className={styles.friend_picture}/>
            <div className={styles.friend_info}>
                <small>{friend.name}</small>
            </div>
            <div className={styles.friend_options}>
                <BsThreeDots/>
            </div>
        </div>
    )
}