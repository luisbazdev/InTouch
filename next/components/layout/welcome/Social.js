import React, { useEffect, useState } from 'react'

import Friends from './Friends';
import Invitations from './Invitations';

import styles from './Social.module.css'

export default function Social({session, group}){
    return (
    <div className={styles.main}>
        <Friends session={session} group={group}/>
    </div>
    )
}