import React, { useEffect, useState } from "react"

import { onSnapshot, query, collection, where, documentId } from 'firebase/firestore';
import { db } from '../../../firebase';

import { GroupContext } from "../../../contexts/GroupContext"

import Member from "./Member";

import styles from './Members.module.css'

export default function Members(){
    const { currentGroupData } = React.useContext(GroupContext)
    
    const [members, setMembers] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users'), where(documentId(), 'in', currentGroupData[0].data().members)), 
        (snapshot) => {
            setMembers(snapshot.docs)
        }) 
            
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        members.forEach(element => {
            console.log(element.data())
        });
    }, [members])

    return (
        <div className={styles.content}>
            <div className={styles.members}>
                <div className={styles.members_header}>
                    <h3>Members</h3>
                </div>
                {members.length > 0 && members.map((member) => <Member member={member.data()}/>)}
            </div>
        </div>
    )
}