import { BsThreeDots } from 'react-icons/bs'

import styles from './Member.module.css'

export default function Member({member}){
    return (
        <div className={styles.member_card}>
            <img src={member.picture} className={styles.member_picture}/>
            <div className={styles.member_info}>
                <p>{member.name}</p>
                <small>Hello, InTouch!</small>
            </div>
            <div className={styles.member_options}>
                <BsThreeDots/>
            </div>
        </div>
    )
}