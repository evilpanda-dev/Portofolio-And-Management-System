import { createContext,useState } from "react";

export const UserCountContext = createContext({})

const UserCountProvider=({children}) =>{
const [userCount,setUserCount]=useState({})

return <UserCountContext.Provider value={{userCount,setUserCount}}>{children}</UserCountContext.Provider>
}

export default UserCountProvider