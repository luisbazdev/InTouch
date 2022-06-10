import React, { useEffect, useState } from 'react'

import { onSnapshot, query, where, Timestamp, orderBy, collection, collectionGroup, limit } from 'firebase/firestore';
import { db } from '../../firebase';

import { AuthContext } from "../../contexts/AuthContext";
import { GroupContext } from "../../contexts/GroupContext";

import Activity from './Activity'
import Invitation from './Invitation';

import { HiUserGroup } from 'react-icons/hi'
import { IoIosLogOut } from 'react-icons/io'

import styles from './Welcome.module.css'

export default function Welcome({session}){
    const [recent, setRecent] = useState([])
    const [invitations, setInvitations] = useState([])

    const { setSeeCreateGroup } = React.useContext(GroupContext)

    const { userGroups, logOut } = React.useContext(AuthContext)

    useEffect(() => {
        if(session != null && userGroups.length > 0){
        const today = new Date(Timestamp.now().toMillis() - (24 * 60 * 60 * 1000))

        const unsubscribe = onSnapshot(
        query(collectionGroup(db, `tasks`), 
        where('groupId', 'in', userGroups), 
        where('lastModifiedAt', '>', today), 
        orderBy('lastModifiedAt', 'desc'),
        ),
        (snapshot) => {
          setRecent(snapshot.docs)
        })

        return () => {
            unsubscribe()
        }
    }
    }, [session, userGroups])

    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, 'invitations'), where('to', '==', session.email)), 
            (snapshot) => {
                setInvitations(snapshot.docs)
            }) 
            
            return () => {
                unsubscribe()
            }
        }
    }, [session])

    useEffect(() => {
        console.log(invitations)
    }, [invitations])

    return (
        <div className={styles.welcome}>
            <div className={styles.profile}>
                <div className={styles.user}>
                    <img src={session?.pictureURL}/>
                    <small>{session?.username}</small>
                    <div className={styles.auth}>
                        <div className={styles.auth_button} onClick={logOut}>
                            <small>Exit</small>
                            <IoIosLogOut className={styles.auth_icon}/> 
                        </div>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.option} onClick={() => setSeeCreateGroup(true)}>
                        <HiUserGroup className={styles.option_icon}/> 
                        <small><strong>Create group</strong></small>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.activity}>
                    <div className={styles.header}>
                        <h2>Activity</h2>
                    </div>
                    <div className={styles.thing}>
                        {recent.map((r) => <Activity key={r.id} activity={r.data()}/>)}
                    </div>
                </div>
                <div className={styles.invitations}>
                    <div className={styles.header}>
                        <h2>Invitations</h2>
                    </div>
                    <div className={styles.thing2}>
                        {invitations.map((inv) => <Invitation key={inv.id} session={session} invitation={inv.data()}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}