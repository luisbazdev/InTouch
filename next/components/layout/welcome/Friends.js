import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from '../../../firebase'

import Requests from './Requests';

import Friend from './Friend';

import { FiUsers } from 'react-icons/fi'
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'

import styles from './Friends.module.css'
import Invitations from './Invitations';

export default function Friends({session}){

    const [seeFriends, setSeeFriends] = useState(true)
    const [seeRequests, setSeeRequests] = useState(false)
    const [seeInvitations, setSeeInvitations] = useState(false)

    const [friends, setFriends] = useState([])

    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query((collection(db, "users"))), 
            (snapshot) => {
              setFriends(snapshot.docs)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [session])

    return (
        <div className={styles.friends}>
            <div className={styles.friends_header}>
                <h2>Social</h2>
            </div>

            <div className={styles.friends_navbar}>
                <div className={styles.friends_navbar_section}>
                    <p>FRIENDS</p>
                    <div className={styles.friends_navbar_options}>
                        <div className={`${styles.friends_navbar_option} ${seeFriends ? styles.friends_navbar_selected : ''}`} onClick={() => {
                            setSeeFriends(true)
                            setSeeRequests(false)
                            setSeeInvitations(false)
                        }}>
                            <FiUsers className={styles.friends_navbar_icon}/>
                            <small>My Friends</small>
                        </div>
                        <div className={`${styles.friends_navbar_option} ${seeRequests ? styles.friends_navbar_selected : ''}`} onClick={() => {
                            setSeeFriends(false)
                            setSeeRequests(true)
                            setSeeInvitations(false)
                        }}>
                            <AiOutlineUserAdd className={styles.friends_navbar_icon}/>
                            <small>Requests</small>
                        </div>
                    </div>
                </div>

                <div className={styles.friends_navbar_section}>
                    <p>TEAMS</p>
                    <div className={styles.friends_navbar_options}>
                        <div className={`${styles.friends_navbar_option} ${seeInvitations ? styles.friends_navbar_selected : ''}`} onClick={() => {
                        setSeeFriends(false)
                        setSeeRequests(false)
                        setSeeInvitations(true)
                        }}>
                            <AiOutlineUsergroupAdd className={styles.friends_navbar_icon}/>
                            <small>Invitations</small>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.friends_main}>
                {seeFriends && friends?.length > 0 && friends?.map((friend) => <Friend friend={friend.data()}/>)}
                {seeRequests && <Requests session={session}/>}
                {seeInvitations && <Invitations session={session}/>}
            </div>
        </div>
    )
}