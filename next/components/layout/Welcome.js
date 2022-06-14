import React from 'react'

import { WelcomeContext } from "../../contexts/WelcomeContext"

import WelcomeNavbar from './welcome/WelcomeNavbar'

import General from './welcome/General'
import Social from './welcome/Social'

import styles from './Welcome.module.css'

export default function Welcome({session, group}){

    const { seeGeneral, seeSocial } = React.useContext(WelcomeContext)

    return (
        <div className={styles.welcome}>
            <WelcomeNavbar session={session}/>

            { seeGeneral ? <General session={session}/> : null}
            { seeSocial ? <Social session={session} group={group}/> : null}
        </div>
    )
}