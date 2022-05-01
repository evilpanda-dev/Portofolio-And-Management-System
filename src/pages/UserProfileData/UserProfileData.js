import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import './UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';

const UserProfileData = props => {
    const { setImage, setUserName, setRole, imageSrc } = props;

    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc} setUserName={setUserName} setRole={setRole} />
        <section className="userProfileData">
        <Typography variant="h4" component="h2" align="center" marginTop={'40px'}>
  Your profile data: 
</Typography>
<DataTable/>
            </section>
        </>
    )
}

export default UserProfileData;