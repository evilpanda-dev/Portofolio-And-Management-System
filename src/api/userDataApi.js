export const getDatabaseData = async(params) =>{
    // const dispatch = useDispatch()
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