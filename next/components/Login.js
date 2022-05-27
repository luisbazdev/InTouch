import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login(){
    const { signIn, loading } = React.useContext(AuthContext)

    if(loading){
        return (
            <div>Loading . . .</div>
        )
    }

    return (
        <div>
            <h1>Login page</h1>
            <button onClick={signIn}>Sign In With Google</button>
        </div>
    )
}