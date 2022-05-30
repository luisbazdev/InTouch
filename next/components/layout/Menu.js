import React, { useState } from "react";
import styles from './Menu.module.css'

import MenuMain from "./MenuMain";
import MenuNewTask from "./MenuNewTask";
import MenuNewBranch from "./MenuNewBranch";

export default function Menu({group, session}){

    const [seeNewTask, setSeeNewTask] = useState(false)
    const [seeNewBranch, setSeeNewBranch] = useState(false)

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
            {(!seeNewTask && !seeNewBranch) && <MenuMain 
               seeNewTask={seeNewTask} 
               setSeeNewTask={setSeeNewTask} 
               seeNewBranch={seeNewBranch}
               setSeeNewBranch={setSeeNewBranch}/>}

            {seeNewTask && <MenuNewTask
               group={group}
               session={session}
               seeNewTask={seeNewTask}
               setSeeNewTask={setSeeNewTask}
               />}

            {seeNewBranch && <MenuNewBranch
                group={group}
                styles={styles}
                session={session}
                seeNewBranch={seeNewBranch}
                setSeeNewBranch={setSeeNewBranch}
            />}
        </div>
    )
}