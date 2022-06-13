import React, { useState } from "react";

const WelcomeContext = React.createContext(null)

const WelcomeProvider = ({children}) => {

    const [seeGeneral, setSeeGeneral] = useState(true)
    const [seeSocial, setSeeSocial] = useState(false)

    const [preview, setPreview] = useState(null)
    
    const data = {
        seeGeneral, setSeeGeneral,
        seeSocial, setSeeSocial,
        preview, setPreview
    }

    return (
        <WelcomeContext.Provider value={data}>
            {children}
        </WelcomeContext.Provider>
    )
}

export { WelcomeContext, WelcomeProvider }

