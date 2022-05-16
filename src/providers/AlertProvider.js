import { createContext, useState } from "react";

export const AlertContext = createContext({})

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({})

    return <AlertContext.Provider value={{ alert, setAlert }}>{children}</AlertContext.Provider>
}

export default AlertProvider