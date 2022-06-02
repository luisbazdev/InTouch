import React from "react"

import { GroupContext } from "../../contexts/GroupContext"

import styles from './Header.module.css'

export default function Header(){

    const { currentGroupData } = React.useContext(GroupContext)
    
    return (
        <div className={styles.header}>
            <h3>{currentGroupData[0]?.data().name}</h3>
            <small>{currentGroupData[0]?.data().description}</small>
        </div>
    )
}