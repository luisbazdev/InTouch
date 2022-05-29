import styles from './CheckModal.module.css'

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'

import Task from './Task';

import { AiOutlineClose } from "react-icons/ai";

export default function CheckModal({group, selected, setSelected, close}){

    function finish(){
        for (let i = 0; i < selected.length; i++) {
            var taskRef = doc(db, 'groups', `${group}/tasks/${selected[i].id}`);

            updateDoc(taskRef, {
                completed: true,
                finishedAt: serverTimestamp()
            })
        }

        setSelected([])
        close(false)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.message}>
                    <div className={styles.close} onClick={() => close(false)} >
                        <AiOutlineClose className={styles.icon}/>
                    </div>
                    Are you sure you want to check the following tasks?
                </div>

                <div className={styles.tasks}>
                    {selected.map((task) => <Task key={task.id} task={task} disabled={true}/>)}
                </div>
                <div className={styles.message} onClick={finish}>
                    Yes
                </div>
            </div>
        </div>
    )
}