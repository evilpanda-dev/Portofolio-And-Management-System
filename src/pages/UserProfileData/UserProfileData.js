import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import './UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';
import Button from "../../components/Button/Button";

const UserProfileData = props => {
    const { setImage, setUserName, setRole, imageSrc } = props;
    const buttonDesign = {
        buttonClass: "previousButton"
      }
    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="userProfileData">
        <Typography variant="h4" component="h2" align="center" marginTop={'40px'}>
  Your profile data: 
</Typography>
<DataTable/>
<div className="previousPageButtonContainer">
<Button text="Previous page" address="/profile" theme={buttonDesign} />
</div>
            </section>
        </>
    )
}

export default UserProfileData;