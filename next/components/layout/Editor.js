import React, { useState } from "react";

import styles from './Editor.module.css'

import NavBar from "./NavBar";

import Tasks from "./Tasks";
import Checked from "./Checked";
import Branches from "./Branches";

import Menu from "./Menu";

export default function Editor({group, session}){
    const [seeHome, setSeeHome] = useState(true)
    const [seeChecked, setSeeChecked] = useState(false)
    const [seeBranches, setSeeBranches] = useState(false)

    return (
        <div className={styles.editor}>
            <NavBar styles={styles} 
            setSeeHome={setSeeHome} 
            setSeeChecked={setSeeChecked} 
            setSeeBranches={setSeeBranches}/>

            {/* <div className={styles.content}> */}
                {seeHome && <Tasks group={group} styles={styles}/>}
                {seeChecked && <Checked group={group} styles={styles}/>}
                {seeBranches && <Branches group={group} styles={styles}/>}    
            {/* </div> */}

            <Menu group={group} session={session}/>
        </div>
    )
}