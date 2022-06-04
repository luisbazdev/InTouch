import React, { useState, useEffect } from "react"

import styles from './Sidebar.module.css'

import { onSnapshot, collection, query, where } from 'firebase/firestore';
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

    const [ groups, setGroups ] = useState([])

    // Retrieve the groups the user belongs
    // to in order, because right now it retrieves
    // the groups in alphabetical order
    useEffect(() => {
        if(session != null){
            const unsubscribe = onSnapshot(query((collection(db, "groups")), where('members', 'array-contains-any', [session.uid])), 
            (snapshot) => {
              setGroups(snapshot.docs)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [session])
    
    return (
        <div className={styles.sidebar}>
            <div className={styles.create} onClick={() => setSeeCreateGroup(true)}>
                <AiOutlinePlus className={styles.icon}/>
            </div>
            <div className={styles.groups}>
                {groups?.map((g) => {
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