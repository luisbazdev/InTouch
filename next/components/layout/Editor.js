import React from "react";

import styles from './Editor.module.css'

import NavBar from "./NavBar";

import Tasks from "./Tasks";
import Checked from "./Checked";
import Removed from "./Removed"
import Branches from "./Branches";

import Menu from "./Menu";

import { GroupContext } from "../../contexts/GroupContext";

export default function Editor({group, session}){
    
    const { 
        seeHome, setSeeHome,
        seeChecked, setSeeChecked,
        seeBranches, setSeeBranches,
        seeRemoved, setSeeRemoved,
        seeMembers, setSeeMembers
    } = React.useContext(GroupContext)

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
            seeMembers={seeMembers}
            setSeeMembers={setSeeMembers}
            />

            {seeHome && <Tasks group={group} styles={styles}/>}
            {seeChecked && <Checked group={group} styles={styles}/>}
            {seeBranches && <Branches group={group} styles={styles}/>}    
            {seeRemoved && <Removed group={group} styles={styles}/>}    
            {/* {seeMembers && <Members group={group} styles={styles}/>}     */}

            <Menu group={group} session={session}/>
        </div>
    )
}