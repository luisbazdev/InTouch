import React from "react";
import styles from './Menu.module.css'

import MenuMain from "./MenuMain";

export default function Menu(){

    return (
        <div className={styles.menu}>
            <MenuMain/>
        </div>
    )
}