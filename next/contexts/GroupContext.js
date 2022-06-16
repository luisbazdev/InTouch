import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where, documentId} from "firebase/firestore";
import { db } from '../firebase';

const GroupContext = React.createContext(null)

const GroupProvider = ({children}) => {

    const [group, setGroup] = useState(null)
    const [currentGroupData, setCurrentGroupData] = useState([])

    const [seeHome, setSeeHome] = useState(true)
    const [seeChecked, setSeeChecked] = useState(false)
    const [seeBranches, setSeeBranches] = useState(false)
    const [seeRemoved, setSeeRemoved] = useState(false)
    const [seeMembers, setSeeMembers] = useState(false)
    const [seeSettings, setSeeSettings] = useState(false)

    const [seeCreate, setSeeCreate] = useState(false)
    const [seeCreateGroup, setSeeCreateGroup] = useState(false)
    const [seeCheckModal, setSeeCheckModal] = useState(false)
    const [seeNewTaskModal, setSeeNewTaskModal] = useState(false)
    const [seeNewBranchModal, setSeeNewBranchModal] = useState(false)
    const [seeRemoveModal, setSeeRemoveModal] = useState(false)
    const [seeAddMemberModal, setSeeAddMemberModal] = useState(false)
    
    useEffect(() => {
        if(group != null){
            const unsubscribe = onSnapshot(query((collection(db, 'groups')), where(documentId(), '==', group.id)), 
            (snapshot) => {
              setCurrentGroupData(snapshot.docs)
            })

        return () => {
            unsubscribe()
        }
    }
    }, [group])

    const data = {
        seeCreate, setSeeCreate,
        seeCreateGroup, setSeeCreateGroup,
        seeCheckModal, setSeeCheckModal,
        seeNewTaskModal, setSeeNewTaskModal,
        seeNewBranchModal, setSeeNewBranchModal,
        seeRemoveModal, setSeeRemoveModal,
        group, setGroup,
        currentGroupData, setCurrentGroupData,
        seeHome, setSeeHome,
        seeChecked, setSeeChecked,
        seeBranches, setSeeBranches,
        seeRemoved, setSeeRemoved,
        seeMembers, setSeeMembers,
        seeSettings, setSeeSettings,
        seeAddMemberModal, setSeeAddMemberModal,
    }

    return (
        <GroupContext.Provider value={data}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }

