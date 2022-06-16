import React from "react";

import { AuthContext } from "../contexts/AuthContext";
import { GroupContext } from "../contexts/GroupContext";

import Sidebar from "./layout/Sidebar";
import Editor from "./layout/Editor";
import Header from "./layout/Header";

import CreateModal from "./modals/CreateModal";
import NewTaskModal from "./modals/NewTaskModal";
import NewBranchModal from "./modals/NewBranchModal";
import NewGroupModal from "./modals/NewGroupModal";
import CheckModal from "./modals/CheckModal";
import RemoveModal from "./modals/RemoveModal";

import Welcome from "./layout/Welcome";

import ReactLoading from 'react-loading';
import InviteModal from "./modals/InviteModal";

import styles from './Main.module.css'

export default function Main(){

    const { session, loading } = React.useContext(AuthContext)

    const { selected,
            setSelected,
            seeCreateGroup, 
            setSeeCreateGroup,
            seeCheckModal,
            setSeeCheckModal,
            seeCreate,
            setSeeCreate,
            seeNewTaskModal,
            setSeeNewTaskModal,
            seeNewBranchModal,
            setSeeNewBranchModal,
            seeRemoveModal,
            setSeeRemoveModal,
            seeAddMemberModal,
            setSeeAddMemberModal,
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
            { seeCreate && <CreateModal session={session} group={group} close={setSeeCreate}/>}
            { seeNewTaskModal && <NewTaskModal session={session} group={group} close={setSeeNewTaskModal}/>}
            { seeNewBranchModal && <NewBranchModal session={session} group={group} close={setSeeNewBranchModal}/>}
            { seeCreateGroup && <NewGroupModal session={session} close={setSeeCreateGroup}/>}
            { seeCheckModal && <CheckModal session={session} group={group} close={setSeeCheckModal} selected={selected} setSelected={setSelected}/>}
            { seeRemoveModal && <RemoveModal session={session} group={group} close={setSeeRemoveModal} selected={selected} setSelected={setSelected}/>}
            { seeAddMemberModal && <InviteModal session={session} group={group} close={setSeeAddMemberModal}/>}

            <Sidebar session={session}/>
            
            {group == null && <div className={styles.home}>
                <Welcome session={session} group={group}/>
            </div>}

            {group != null && <Header/>}
            {group != null && (
                <div className={styles.main}>
                    <Editor group={group} session={session}/>
                </div>
            )}
        </div>
    )
}
