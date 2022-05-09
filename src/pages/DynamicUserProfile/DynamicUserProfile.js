import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import '../UserProfileData/UserProfileData.css';
import { Typography } from "@mui/material";
import '@fontsource/roboto/400.css';
import Button from "../../components/Button/Button";
import { UserContext } from "../../providers/UserProvider";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { getPersonalProfile } from "../../features/profileFormThunks";

const DynamicUserProfile = props => {
    const { setImage, setUserName, setRole, imageSrc } = props;
     const dispatch = useDispatch()
     let location = useLocation();
     const userName =  location.pathname.split("/profile/")[1]
    const buttonDesign = {
        buttonClass: "previousButton"
      }

      const getData = async (userName) => {
         const data =  await dispatch(getPersonalProfile({userName : userName}))
         .then((response) => {
                return response.payload
         });
         return await data;
      }
      const data = getData(userName);

    //   const gigel = (async () =>{
    //       console.log(await data)
    //   })()
      
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