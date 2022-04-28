import { createContext, useContext, useState } from "react";

const authContext = createContext();

const useProvideAuth = () => {

    const [actorData, setActorData] = useState({});

    function putActorData(newActorData) {
        setActorData(newActorData);
    }

    function deleteActorData() {
        setActorData({});
    }

    return {
        actorData, putActorData, deleteActorData
    }
}

export const ProvideAuth = ({children, ...props}) => {
    const auth = useProvideAuth();

    return( <authContext.Provider value = {auth} {...props}> {children} </authContext.Provider> )
}

export const useAuth = () => useContext(authContext);