import React from "react"

import styles from './MenuMain.module.css'

import { AiOutlinePlus } from 'react-icons/ai'

import { GroupContext } from "../../contexts/GroupContext"

export default function MenuMain({setSeeNewTaskModal, setSeeNewBranchModal}){

    const { currentGroupData } = React.useContext(GroupContext)

    return (
        <div className={styles.info}>
            <div className={styles.options}>
                <div className={styles.button}>
                    <AiOutlinePlus/>
                    <button onClick={() => setSeeNewTaskModal(true)}>New task</button>
                </div>
                <div className={styles.button}>
                    <AiOutlinePlus/>
                    <button onClick={() => setSeeNewBranchModal(true)}>New branch</button>
                </div>
            </div>
            <p className={styles.overview}>
                {currentGroupData[0]?.data().overview}
            </p>
        </div>
    )
}