import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import './UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';
import Button from "../../components/Button/Button";
import { UserContext } from "../../providers/UserProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserProfileData = props => {
    const { setImage, setUserName, setRole, imageSrc } = props;
    // const { user } = useContext(UserContext);
    // const navigate = useNavigate();
    // const userId = user?.userId;
    const {userProfile} = useContext(UserProfileContext);
    const buttonDesign = {
        buttonClass: "previousButton"
      }

//       const terminateAccount = () => {
//         fetch(`https://localhost:5000/api/deleteUser/${userId}`, {
//     method: 'DELETE'
//   })
//   .then(response => response.json());
//   navigate('/Inner')
// }

    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="userProfileData">
        <Typography variant="h4" component="h2" align="center" marginTop={'40px'}>
  Your profile data: 
</Typography>
<DataTable profileData={userProfile}/>
<div className="previousPageButtonContainer">
<Button text="Previous page" address="/profile" theme={buttonDesign} />
</div>
<div className="terminateAccountButtonContainer">
    {/* <button onClick={terminateAccount}>Terminate account</button> */}
<ConfirmDialog/>
</div>
            </section>
        </>
    )
}

export default UserProfileData;