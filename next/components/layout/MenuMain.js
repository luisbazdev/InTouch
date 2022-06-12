import React from "react"

import styles from './MenuMain.module.css'

import { AiOutlinePlus } from 'react-icons/ai'

import { GroupContext } from "../../contexts/GroupContext"

export default function MenuMain(){

    const { currentGroupData } = React.useContext(GroupContext)

    return (
        <div className={styles.info}>
            <p className={styles.overview}>
                <small>{currentGroupData[0]?.data().overview}</small>
            </p>
        </div>
    )
}