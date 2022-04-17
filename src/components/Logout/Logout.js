import '../Logout/Logout.css'

const Logout = (props) =>{
   const {
        setUserName
    } = props

    const logout = async() =>{
         await fetch('https://localhost:5000/api/logout',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include'
        });
        setUserName('')
    }

    return (
        <div className="logoutButton">
        <button id="showLogot" className="showLogoutButton" onClick={logout}>Logout</button>
    </div>
    )
}

export default Logout;