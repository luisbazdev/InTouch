import React, { useState } from "react";

const GroupContext = React.createContext(null)

const GroupProvider = ({children}) => {
    const [selected, setSelected] = useState([])

    const [seeCreateGroup, setSeeCreateGroup] = useState(false)
    const [seeCheckModal, setSeeCheckModal] = useState(false)
    const [seeNewTaskModal, setSeeNewTaskModal] = useState(false)
    const [seeNewBranchModal, setSeeNewBranchModal] = useState(false)

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
        setSeeNewBranchModal
    }

    return (
        <GroupContext.Provider value={data}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }

