import React, { useState } from "react";

const GroupContext = React.createContext(null)

const GroupProvider = ({children}) => {
    const [seeCreateGroup, setSeeCreateGroup] = useState(false)

    const data = {
        seeCreateGroup,
        setSeeCreateGroup,
    }

    return (
        <GroupContext.Provider value={data}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }

