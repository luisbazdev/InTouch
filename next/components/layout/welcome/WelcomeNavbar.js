import React from 'react'

import { WelcomeContext } from "../../../contexts/WelcomeContext"
import { GroupContext } from "../../../contexts/GroupContext"

import { MdGroup } from 'react-icons/md'
import { TiUserAdd } from 'react-icons/ti'

import styles from './WelcomeNavbar.module.css'

export default function WelcomeNavbar({session}){

    const { setSeeCreateGroup } = React.useContext(GroupContext)
    const { seeGeneral, setSeeGeneral, seeSocial, setSeeSocial } = React.useContext(WelcomeContext)

    return (
        <div className={styles.nav}>
            <div className={styles.nav_sections}>
                <div className={styles.nav_general} onClick={() => {
                    setSeeGeneral(true)
                    setSeeSocial(false)
                }}>
                    <small className={`${seeGeneral ? styles.navbar_selected : ''}`}>General</small>
                </div>
                <div className={styles.nav_social} onClick={() => {
                    setSeeGeneral(false)
                    setSeeSocial(true)
                }}>
                    <small className={`${seeSocial ? styles.navbar_selected : ''}`}>Social</small>
                </div>
                {/* <div className={styles.nav_invitations}>
                    <small>Help</small>
                </div> */}
            </div>

            <div className={styles.config}>
                <div className={styles.creatable}>
                    <div className={styles.new_group} onClick={setSeeCreateGroup}>
                        <MdGroup className={styles.icon}/>
                        <small>Create group</small>
                    </div>
                    <div className={styles.add_friend}>
                        <TiUserAdd className={styles.icon}/>
                        <small>Add friend</small>
                    </div>
                </div>
                <div className={styles.profile}>
                    <img src={session?.pictureURL}/>
                </div>
            </div>
        </div>
    )
}