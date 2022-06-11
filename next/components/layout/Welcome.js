import React, { useEffect, useState } from 'react'

import { onSnapshot, query, where, Timestamp, orderBy, collection, collectionGroup, limit } from 'firebase/firestore';
import { db } from '../../firebase';

import { AuthContext } from "../../contexts/AuthContext";
import { GroupContext } from "../../contexts/GroupContext";

import Activity from './Activity'
import Invitation from './Invitation';

import { HiUserGroup } from 'react-icons/hi'
import { IoIosLogOut } from 'react-icons/io'

import { MdGroup } from 'react-icons/md'
import { TiUserAdd } from 'react-icons/ti'

import styles from './Welcome.module.css'

export default function Welcome({session}){
    const [activity, setActivity] = useState([])
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
          setActivity(snapshot.docs)
        })

        return () => {
            unsubscribe()
        }
    }
    }, [session, userGroups])

    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, 'invitations'), where('to', '==', session.email), where('state', '==', 'pending')), 
            (snapshot) => {
                setInvitations(snapshot.docs)
            }) 
            
            return () => {
                unsubscribe()
            }
        }
    }, [session])

    return (
        <div className={styles.welcome}>
            <div className={styles.header}>
                <div className={styles.nav}>
                    <div className={styles.nav_activity}>
                        <small>General</small>
                    </div>
                    <div className={styles.nav_invitations}>
                        <small>Social</small>
                    </div>
                    <div className={styles.nav_invitations}>
                        <small>Help</small>
                    </div>
                </div>

                <div className={styles.config}>
                    <div className={styles.creatable}>
                        <div className={styles.new_group} onClick={setSeeCreateGroup}>
                            <MdGroup className={styles.icon}/>
                            <small>Create group</small>
                        </div>
                        <div className={styles.add_friend}>
                            <TiUserAdd className={styles.icon}/>
                            <small>Add friend</small>
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <img src={session?.pictureURL}/>
                    </div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.activity}>
                    <div className={styles.activity_header}>
                        <h2>Activity</h2>
                    </div>
                    <div className={styles.activity_container}>
                        {activity.map((r) => <Activity key={r.id} activity={r.data()}/>)}
                    </div>
                </div>
                <div className={styles.invitations}>
                    <div className={styles.invitations_header}>
                        <h2>Invitations</h2>
                    </div>
                    <div className={styles.invitations_container}>
                        {invitations.map((inv) => <Invitation key={inv.id} session={session} invitation={inv.data()} invitationId={inv.id}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}