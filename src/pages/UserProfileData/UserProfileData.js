import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import './UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';
import Button from "../../components/Button/Button";
import { useContext } from "react";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const buttonDesign = {
    buttonClass: "previousButton"
  }

const UserProfileData = props => {
    const {imageSrc } = props;

    const {userProfile} = useContext(UserProfileContext);
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
<ConfirmDialog/>
</div>
            </section>
        </>
    )
}

export default UserProfileData;