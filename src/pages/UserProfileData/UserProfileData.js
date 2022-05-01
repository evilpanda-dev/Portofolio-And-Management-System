import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import '../UserProfileData/UserProfileData.css';

const UserProfileData = props => {
    const { setImage, setUserName, setRole, imageSrc } = props;

    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc} setUserName={setUserName} setRole={setRole} />
        <section className="userProfileData">

            </section>
        </>
    )
}

export default UserProfileData;