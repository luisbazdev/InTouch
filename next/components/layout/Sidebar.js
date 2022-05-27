import React, { useState, useEffect } from "react"

import styles from './Sidebar.module.css'

import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import Link from "next/link";

import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';

import { GroupContext } from "../../contexts/GroupContext";

export default function Sidebar({session}){
    const { setSeeCreateGroup } = React.useContext(GroupContext)
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
            <div className={styles.create_container} onClick={() => setSeeCreateGroup(true)}>
                <AiOutlinePlus className={styles.create_button}/>
            </div>
            {groups?.map((group) => {
                return (
                <div className={styles.group} key={group.id}>
                    {/* use context to set seeHome to 'true' and 
                    seeBranches to 'false' when changing group,
                    or maybe not... */}
                    <Link href={`/g/${group.id}`}><img src={group?.data()?.picture}/></Link>
                </div>)
            })}
            <div className={styles.search}>
                <AiOutlineSearch className={styles.button}/>
            </div>
        </div>
    )
}