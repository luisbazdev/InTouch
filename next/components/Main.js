import React from "react";

import styles from './Main.module.css'

import { AuthContext } from "../contexts/AuthContext";
import { GroupContext } from "../contexts/GroupContext";

import Sidebar from "./layout/Sidebar";
import Editor from "./layout/Editor";
import Header from "./layout/Header";

import NewGroupModal from "./layout/NewGroupModal";
import CheckModal from "./layout/CheckModal";

export default function Main({group}){

    const { session, loading } = React.useContext(AuthContext)

    const { selected,
            setSelected,
            seeCreateGroup, 
            setSeeCreateGroup,
            seeCheckModal,
            setSeeCheckModal } = React.useContext(GroupContext)

    {/*Users can see groups where they're
    not in by joining its url and getting
    redirected 1 second after...*/}
    if(loading){
        return (
            <div>Loading . . .</div>
        )
    }

    return (
        <div className={styles.app}>
            { seeCreateGroup && <NewGroupModal session={session} close={setSeeCreateGroup}/>}
            { seeCheckModal && <CheckModal group={group} session={session} close={setSeeCheckModal} selected={selected} setSelected={setSelected}/>}
            
            <Sidebar session={session}/>
            <Header group={group}/>
            <div className={styles.main}>
                {group != null && <Editor group={group} session={session}/>}
            </div>
        </div>
    )
}

                {/* Editor is showing even right after logging in when 
                there's no selected group, there are 2 options:
                either to not render 'Editor' component yet,
                or to set a default current group. */}