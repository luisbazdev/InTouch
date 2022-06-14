import React from 'react'

import Activities from './Activities';
import Preview from './Preview';

import { WelcomeContext } from "../../../contexts/WelcomeContext";

import styles from './General.module.css'

export default function General({session}){

    const { preview } = React.useContext(WelcomeContext)

    return (
    <div className={styles.main}>
        <Activities session={session}/>
        {preview != null && <Preview preview={preview}/>}
    </div>
    )
}