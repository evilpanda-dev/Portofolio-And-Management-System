import { createContext, useState } from "react";

export const UserProfileContext = createContext({})

const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({})

    return <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>{children}</UserProfileContext.Provider>
}

export default UserProfileProvider