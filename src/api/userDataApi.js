export const getDatabaseData = async(params) =>{
    var url = new URL ("https://localhost:5000/api/allUserData")
    if (params != null) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
    return (
         fetch(url, {
            method: "GET",
          }) 
          .then((response) => {
            return response.json()
          })
    )
      }

      export const getCommentsData = async(params) =>{
        var url = new URL ("https://localhost:5000/api/allUserComments")
        if (params != null) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        
        return (
             fetch(url, {
                method: "GET",
              }) 
              .then((response) => {
                return response.json()
              })
        )
          }