import React, { useState } from "react";

const GroupContext = React.createContext(null)

const GroupProvider = ({children}) => {
    const [selected, setSelected] = useState([])

    const [seeCreateGroup, setSeeCreateGroup] = useState(false)
    const [seeCheckModal, setSeeCheckModal] = useState(false)

    const data = {
        selected,
        setSelected,
        seeCreateGroup,
        setSeeCreateGroup,
        seeCheckModal,
        setSeeCheckModal
    }

    return (
        <GroupContext.Provider value={data}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }

