import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import '../UserProfileData/UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';
import Button from "../../components/Button/Button";
import { useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPersonalProfile } from "../../features/profileFormThunks";

const buttonDesign = {
  buttonClass: "previousButton"
}

const DynamicUserProfile = props => {
    const {imageSrc } = props;

     const dispatch = useDispatch()
     let location = useLocation();
     const userName =  location.pathname.split("/profile/")[1]


      const getData = async (userName) => {
         const data =  await dispatch(getPersonalProfile({userName : userName}))
         .then((response) => {
                return response.payload
         });
         return await data;
      }
      const data = getData(userName);
      
    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="userProfileData">
        <Typography variant="h4" component="h2" align="center" marginTop={'40px'}>
  {`${userName}'s`} profile data: 
</Typography>
<DataTable profileData={data}/>
<div className="previousPageButtonContainer">
<Button text="Previous page" address="/Inner" theme={buttonDesign} />
</div>
            </section>
        </>
    )
}

export default DynamicUserProfile;