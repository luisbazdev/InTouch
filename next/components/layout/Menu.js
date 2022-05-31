import React from "react";
import styles from './Menu.module.css'

import MenuMain from "./MenuMain";

import { GroupContext } from "../../contexts/GroupContext";

export default function Menu({group, session}){

    const { setSeeNewTaskModal, setSeeNewBranchModal } = React.useContext(GroupContext)

    // Better listen for group branches in
    // this component and if there are not,
    // disable the MenuNewTask button.

    // Also fix the selection tag where
    // you can select branches when
    // creating a new task.

    // Also fix the design, because it's
    // overflowing.

    // Also change the ColorPicker.
    return (
        <div className={styles.menu}>
            <MenuMain 
               setSeeNewTaskModal={setSeeNewTaskModal}
               setSeeNewBranchModal={setSeeNewBranchModal}/>
        </div>
    )
}