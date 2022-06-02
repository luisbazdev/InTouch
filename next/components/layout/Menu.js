import React from "react";
import styles from './Menu.module.css'

import MenuMain from "./MenuMain";

import { GroupContext } from "../../contexts/GroupContext";

export default function Menu(){

    const { setSeeNewTaskModal, setSeeNewBranchModal } = React.useContext(GroupContext)

    return (
        <div className={styles.menu}>
            <MenuMain 
               setSeeNewTaskModal={setSeeNewTaskModal}
               setSeeNewBranchModal={setSeeNewBranchModal}/>
        </div>
    )
}