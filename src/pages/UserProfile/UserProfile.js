import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { useEffect, useState } from "react";
import "./UserProfile.css";

const UserProfile = (props) => {
  const { setImage, setUserName, setRole, imageSrc } = props;

  // const [image,setImage] = useState('')
  // useEffect(()=>{
  //     (
  //       async () => {
  //         const response = await fetch('https://localhost:5000/api/userProfile',{
  //           headers: {'Content-Type': 'application/json'},
  //           credentials:'include',
  //       })
  //       .then(response => response.json())
  //       .then(data=>{
  //           console.log(data)
  //             setImage(data.imgByte)
  //       })
  //       }
  //     )();
  //     })

  return (
    <>
      <Panel />
      <Header imageSrc={imageSrc} setUserName={setUserName} setRole={setRole} />
      <section className="profilePage">
        {/* <img alt="not fount" width={"250px"} src={`data:image/jpeg;base64,${image}`} /> */}
        <ProfileForm />
      </section>
    </>
  );
};

export default UserProfile;
