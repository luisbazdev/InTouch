import React, { useState, useEffect } from "react"

import styles from './Sidebar.module.css'

import { onSnapshot, collection, query, where, documentId } from 'firebase/firestore'
import { db } from '../../firebase'

import Link from "next/link"

import { AiOutlineHome } from 'react-icons/ai'

import { GroupContext } from "../../contexts/GroupContext"
import { AuthContext } from "../../contexts/AuthContext"

export default function Sidebar({session}){
    const { group, setGroup,
            setSeeHome,
            setSeeChecked,
            setSeeBranches,
            setSeeRemoved,
            setSeeMembers,
            setSeeSettings } = React.useContext(GroupContext)

    const { userGroups } = React.useContext(AuthContext)

    const [ groups, setGroups ] = useState([])

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
            <Link href='/'>
                <div className={styles.create}>
                    <AiOutlineHome className={styles.icon}/>
                </div>
            </Link>
            <div className={styles.groups}>
                {groups?.sort((a, b) => userGroups.indexOf(a.id) - userGroups.indexOf(b.id)).map((g) => {
                    return (
                    <div className={styles.group} key={g.id}>
                        <Link href={`/g/${g.id}`}>
                            <img 
                            onClick={() => {
                                if(g.id != group){
                                    setGroup({id: g.id, name: g.data().name})

                                    setSeeHome(true)
                                    setSeeChecked(false)
                                    setSeeBranches(false)
                                    setSeeRemoved(false)
                                    setSeeMembers(false)
                                    setSeeSettings(false)
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