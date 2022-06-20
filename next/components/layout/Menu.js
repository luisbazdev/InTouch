import React from "react";

import MenuMain from "./MenuMain";

import styles from './Menu.module.css';

export default function Menu(){

    return (
        <div className={styles.menu}>
            <MenuMain/>
        </div>
    )
}
