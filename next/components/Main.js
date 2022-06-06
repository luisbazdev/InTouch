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
import RemoveModal from "./modals/RemoveModal";

import ReactLoading from 'react-loading';

export default function Main(){

    const { session, loading, logOut } = React.useContext(AuthContext)

    const { selected,
            setSelected,
            seeCreateGroup, 
            setSeeCreateGroup,
            seeCheckModal,
            setSeeCheckModal,
            seeNewTaskModal,
            setSeeNewTaskModal,
            seeNewBranchModal,
            setSeeNewBranchModal,
            seeRemoveModal,
            setSeeRemoveModal,
            group } = React.useContext(GroupContext)

    if(loading){
        return (
            <div className={styles.loading}>
                <ReactLoading type='spin' color='#33be33'/>
            </div>
        )
    }

    return (
        <div className={styles.app}>
            { seeNewTaskModal && <NewTaskModal session={session} group={group} close={setSeeNewTaskModal}/>}
            { seeNewBranchModal && <NewBranchModal session={session} group={group} close={setSeeNewBranchModal}/>}
            { seeCreateGroup && <NewGroupModal session={session} close={setSeeCreateGroup}/>}
            { seeCheckModal && <CheckModal session={session} group={group} close={setSeeCheckModal} selected={selected} setSelected={setSelected}/>}
            { seeRemoveModal && <RemoveModal session={session} group={group} close={setSeeRemoveModal} selected={selected} setSelected={setSelected}/>}

            <Sidebar session={session}/>
            
            {group != null && <Header/>}
            <div className={styles.main}>
                {group != null && <Editor group={group} session={session}/>}
            </div>
            {/* <button onClick={logOut}>log out</button> */}
        </div>
    )
}
