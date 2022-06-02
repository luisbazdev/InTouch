import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where, documentId} from "firebase/firestore";
import { db } from '../firebase';

import { useRouter } from "next/router";

const GroupContext = React.createContext(null)

const GroupProvider = ({children}) => {

    const router = useRouter()

    useEffect(() => {
        console.log(router.query.groupId)
    }, [router.query])

    const [group, setGroup] = useState(null)
    const [currentGroupData, setCurrentGroupData] = useState([])

    const [selected, setSelected] = useState([])

    const [seeCreateGroup, setSeeCreateGroup] = useState(false)
    const [seeCheckModal, setSeeCheckModal] = useState(false)
    const [seeNewTaskModal, setSeeNewTaskModal] = useState(false)
    const [seeNewBranchModal, setSeeNewBranchModal] = useState(false)
    const [seeRemoveModal, setSeeRemoveModal] = useState(false)

    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query((collection(db, 'groups')), where(documentId(), '==', group)), 
            (snapshot) => {
              setCurrentGroupData(snapshot.docs)
            })

        return () => {
            unsubscribe()
        }
    }
    }, [group])

    const data = {
        selected,
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
        group,
        setGroup,
        currentGroupData,
        setCurrentGroupData
    }

    return (
        <GroupContext.Provider value={data}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }

