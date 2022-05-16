import { createContext, useState } from "react";

export const CommentCountContext = createContext({})

const CommentCountProvider = ({ children }) => {
    const [commentsCount, setCommentsCount] = useState({})

    return <CommentCountContext.Provider value={{ commentsCount, setCommentsCount }}>{children}</CommentCountContext.Provider>
}

export default CommentCountProvider