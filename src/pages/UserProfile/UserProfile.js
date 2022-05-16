import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import "./UserProfile.css";
import { useContext } from "react";
import { AlertContext } from "../../providers/AlertProvider";

const UserProfile = (props) => {
  const { setUserName, setRole, imageSrc } = props;
  const { alert } = useContext(AlertContext)

  return (
    <>
      {alert.appAlerts}
      <Panel />
      <Header imageSrc={imageSrc} setUserName={setUserName} setRole={setRole} />
      <section className="profilePage">
        <ProfileForm />
      </section>
    </>
  );
};

export default UserProfile;
