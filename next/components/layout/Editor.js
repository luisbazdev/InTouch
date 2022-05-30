import React, { useState } from "react";

import styles from './Editor.module.css'

import NavBar from "./NavBar";

import Tasks from "./Tasks";
import Checked from "./Checked";
import Removed from "./Removed"
import Branches from "./Branches";

import Menu from "./Menu";

export default function Editor({group, session}){
    const [seeHome, setSeeHome] = useState(true)
    const [seeChecked, setSeeChecked] = useState(false)
    const [seeBranches, setSeeBranches] = useState(false)
    const [seeRemoved, setSeeRemoved] = useState(false)

    return (
        <div className={styles.editor}>
            <NavBar styles={styles}
            seeHome={seeHome} 
            setSeeHome={setSeeHome}
            seeChecked={seeChecked} 
            setSeeChecked={setSeeChecked} 
            seeBranches={seeBranches}
            setSeeBranches={setSeeBranches}
            seeRemoved={seeRemoved}
            setSeeRemoved={setSeeRemoved}
            />

            {seeHome && <Tasks group={group} styles={styles}/>}
            {seeChecked && <Checked group={group} styles={styles}/>}
            {seeBranches && <Branches group={group} styles={styles}/>}    
            {seeRemoved && <Removed group={group} styles={styles}/>}    

            <Menu group={group} session={session}/>
        </div>
    )
}