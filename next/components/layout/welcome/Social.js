import React, { useEffect, useState } from 'react'

import Friends from './Friends';

import styles from './Social.module.css'

export default function Social({session}){
    return (
    <div className={styles.main}>
        <Friends/>
    </div>
    )
}