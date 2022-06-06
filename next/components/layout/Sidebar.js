import React, { useState, useEffect } from "react"

import styles from './Sidebar.module.css'

import { onSnapshot, collection, query, where, documentId, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

import Link from "next/link";

import { AiOutlinePlus } from 'react-icons/ai';

import { GroupContext } from "../../contexts/GroupContext";

export default function Sidebar({session}){
    const { group, setGroup, 
            setSeeCreateGroup,
            setSeeHome,
            setSeeChecked,
            setSeeBranches,
            setSeeRemoved } = React.useContext(GroupContext)

    const [ userGroups, setUserGroups ] = useState([])
    const [ groups, setGroups ] = useState([])

    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query(collection(db, `users/${session.uid}/groups`), orderBy('joinedAt', 'desc')), 
            (snapshot) => {
              let _userGroups = []

              snapshot.docs.forEach(g => {
                  _userGroups.push(g.data().groupId)
              })

              setUserGroups(_userGroups)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [session])

    useEffect(() => {
        if(session != null && userGroups.length > 0){
            const unsubscribe = onSnapshot(query((collection(db, "groups")), where(documentId(), 'in', userGroups),
            ), 
            (snapshot) => {
              setGroups(snapshot.docs)
            })

            return () => {
                unsubscribe()
            }
        }
    }, [session, userGroups])
    
    return (
        <div className={styles.sidebar}>
            <div className={styles.create} onClick={() => setSeeCreateGroup(true)}>
                <AiOutlinePlus className={styles.icon}/>
            </div>
            <div className={styles.groups}>
                {groups?.sort((a, b) => userGroups.indexOf(a.id) - userGroups.indexOf(b.id)).map((g) => {
                    return (
                    <div className={styles.group} key={g.id}>
                        <Link href={`/g/${g.id}`}>
                            <img 
                            onClick={() => {
                                if(g.id != group){
                                    setGroup(g.id)

                                    setSeeHome(true)
                                    setSeeChecked(false)
                                    setSeeBranches(false)
                                    setSeeRemoved(false)
                                }
                            }} 
                            src={g?.data()?.picture}/>
                        </Link>
                    </div>)
                })}
            </div>
        </div>
    )
}