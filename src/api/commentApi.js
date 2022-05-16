export const getComments = async (currentPage) => {
    // const dispatch = useDispatch()
    let data = []
    return (
         fetch(`https://localhost:5000/api/comments/${currentPage}`, {
            method: "GET",
          }) 
          .then((response) => {
            return response.json()
          })
    )
  };
  
  export const createComment = async (text,userName,userId, parentId = null,avatar) => {
    // return {
    //   id: Math.random().toString(36).substr(2, 9),
    //   body: text,
    //   parentId,
    //   userId: "1",
    //   username: "John",
    //   createdAt: new Date().toISOString(),
    // };
    const comment = {
        image : avatar,
        text: text,
        userName: userName,
        userId : userId,
        parentId : parentId,
        createdAt : new Date().toISOString(),
      };
    return (
        await fetch("https://localhost:5000/api/addComment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
          }).then((response) => {
            return response.json()
          })
        )
  };
  
  export const updateComment = async (text,commentId,userName) => {
    return (
        await fetch(`https://localhost:5000/api/updateComment/${commentId}`, {
          method:"PATCH",
          body:JSON.stringify({
            text: text,
            userName : userName
         }),
          
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          
            })
    )
  };
  
  export const deleteComment = async (commentId) => {
    return (
        await fetch(`https://localhost:5000/api/deleteComment/${commentId}`, {
        method: 'DELETE'
      })
    );
  };