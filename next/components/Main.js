import React from "react";

import styles from './Main.module.css'

import { AuthContext } from "../contexts/AuthContext";
import { GroupContext } from "../contexts/GroupContext";

import Sidebar from "./layout/Sidebar";
import Editor from "./layout/Editor";
import Header from "./layout/Header";

import NewTaskModal from "./modals/NewTaskModal";
import NewBranchModal from "./modals/NewBranchModal";
import NewGroupModal from "./modals/NewGroupModal";
import CheckModal from "./modals/CheckModal";

export default function Main({group}){

    const { session, loading } = React.useContext(AuthContext)

    const { selected,
            setSelected,
            seeCreateGroup, 
            setSeeCreateGroup,
            seeCheckModal,
            setSeeCheckModal,
            seeNewTaskModal,
            setSeeNewTaskModal,
            seeNewBranchModal,
            setSeeNewBranchModal } = React.useContext(GroupContext)

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
            { seeNewTaskModal && <NewTaskModal session={session} group={group} close={setSeeNewTaskModal}/>}
            { seeNewBranchModal && <NewBranchModal session={session} group={group} close={setSeeNewBranchModal}/>}
            { seeCreateGroup && <NewGroupModal session={session} close={setSeeCreateGroup}/>}
            { seeCheckModal && <CheckModal session={session} group={group} close={setSeeCheckModal} selected={selected} setSelected={setSelected}/>}

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