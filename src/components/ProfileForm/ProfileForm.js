import { Formik } from "formik";
import { useState,useContext } from "react";
import FormikControl from "../FormikControl/FormikControl";
import Textarea from "../TextArea/TextArea";
import * as Yup from "yup";
import { UserContext } from "../../providers/UserProvider";
import '../ProfileForm/ProfileForm.css';
import Button from "../Button/Button";
import { updateUserProfile } from "../../features/profileFormThunks";
import { useDispatch } from "react-redux";
import { AlertContext } from "../../providers/AlertProvider";
import AlertWindow from "../AlertWindow/AlertWindow";
import { uploadProfileAvatar } from "../../features/profileFormThunks";
import { useAlert } from "../../hooks/useAlert";

const initialValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    avatar: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string("First Name must be a text")
      .min(3, "First Name must be at least 6 characters")
      .max(50, "First Name must be less than 50 characters"),
    lastName: Yup.string("Last Name must be a text")
      .min(3, "Last Name must be at least 6 characters")
      .max(50, "Last Name must be less than 50 characters"),
    birthDate: Yup.date("Birth Date must be a date"),
    address: Yup.string("Address must be a text")
      .min(6, "Address must be at least 6 characters")
      .max(50, "Address must be less than 50 characters"),
    city: Yup.string("City must be a text")
      .min(3, "City must be at least 6 characters")
      .max(50, "City must be less than 50 characters"),
    country: Yup.string("Country must be a text")
      .min(6, "Country must be at least 6 characters")
      .max(50, "Country must be less than 50 characters"),
    phoneNumber: Yup.number("Phone Number must be a number"),
    aboutMe: Yup.string("About Me must be a text")
      .min(6, "About Me must be at least 6 characters")
      .max(100, "About Me must be less than 50 characters"),
  });

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const { user } = useContext(UserContext)
  const dispatch = useDispatch();
  const {setAlert} = useContext(AlertContext)
  const triggerAlert = useAlert()

let uploadButton;
  let formData = new FormData();
    // data.append("firstName",firstName);
    // data.append("lastName",lastName);
    // data.append("birthDate",birthDate);
    // data.append("address",address);
    // data.append("city",city);
    // data.append("country",country);
    // data.append("phoneNumber",phoneNumber);
    // data.append("aboutMe",aboutMe);
    formData.append("files", avatar);

    const userId = user?.userId;

let alert
  const onSubmit = async () => {
    // let data = new FormData();
    // data.append("firstName",firstName);
    // data.append("lastName",lastName);
    // data.append("birthDate",birthDate);
    // data.append("address",address);
    // data.append("city",city);
    // data.append("country",country);
    // data.append("phoneNumber",phoneNumber);
    // data.append("aboutMe",aboutMe);
    // data.append("Files", avatar);
    // return fetch(`https://localhost:5000/api/updateProfile/${userId}`, {
    //   method:"PATCH",
    //   body:JSON.stringify({
    //   firstName : firstName,
    //   lastName : lastName,
    //   birthDate : birthDate,
    //   address : address,
    //   city : city,
    //   country : country,
    //   phoneNumber : phoneNumber,
    //   aboutMe : aboutMe}),
      
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //   }),
      
    //     })
        //.then((response) => response.json())
       const data = await dispatch(updateUserProfile({
          userId : userId,
          firstName : firstName,
          lastName : lastName,
          birthDate : birthDate,
          address : address,
          city : city,
          country : country,
          phoneNumber : phoneNumber,
          aboutMe : aboutMe,
        }))
    triggerAlert(data,"Profile was successefull updated")
        setFirstName("")
          setLastName("")
        setBirthDate("")
        setAddress("")
        setCity("")
        setCountry("")
        setPhoneNumber("")
        setAboutMe("")
        // .then((data) => {
        //   if(data.meta.requestStatus == "fulfilled"){
        //     // setRedirect(true);
        //     // // setUser({userName : data.payload.userName,role : data.payload.role})
        //     // console.log(data)
        //     // const userName = data.meta.arg.email;
        //     // const role =data.meta.arg.role;
        //     // setUserName(userName)
        //     // setRole(role)
        //     // setUser({userName : userName,role : role})
        //     setAlert({appAlerts:
        //       alert = (
        //       <AlertWindow message="Profile was successefull updated!" alertType="success"/>
        //     )})
        //   } 
        //   else {
        //     throw new Error(data.payload)
        //   }
        //   })
        //   .then(setFirstName(""),
        //   setLastName(""),
        // setBirthDate(""),
        // setAddress(""),
        // setCity(""),
        // setCountry(""),
        // setPhoneNumber(""),
        // setAboutMe(""))
        //   .catch(error => {
          
        //   // console.log('caught it!',error.message);
        //   setAlert({appAlerts:
        //     alert = (
        //     // showAlertWindow("error",error.message,true)
        //     <AlertWindow message={error.message} alertType="error" />
        //   )})
        //   })
        //   dispatch({type:"WINDOW_ACTIVATED",payload:true})

        
  };

const uploadAvatar = async () => {
  // return fetch("https://localhost:5000/api/saveAvatar", {
  //     method: "POST",
  //     body: data,
  //     headers: new Headers({
  //       Accept: "application/json",
  //     }),
  //     credentials: "include",
  //   })
  const data = await dispatch(uploadProfileAvatar({avatar : formData}))
  triggerAlert(data,"Avatar uploaded successefully!")
  // .then((data) => {
  //   if(data.meta.requestStatus == "fulfilled"){
  //     // setRedirect(true);
  //     // // setUser({userName : data.payload.userName,role : data.payload.role})
  //     // console.log(data)
  //     // const userName = data.meta.arg.email;
  //     // const role =data.meta.arg.role;
  //     // setUserName(userName)
  //     // setRole(role)
  //     // setUser({userName : userName,role : role})
  //     setAlert({appAlerts:
  //       alert = (
  //       <AlertWindow message="Avatar uploaded successefully!" alertType="success"/>
  //     )})
  //   } 
  //   else {
  //     throw new Error(data.payload)
  //   }
  //   })
  //     //.then((response) => response.json())
  //     .then(setAvatarPreview(""))
  //     .catch(error => {
          
  //       // console.log('caught it!',error.message);
  //       setAlert({appAlerts:
  //         alert = (
  //         // showAlertWindow("error",error.message,true)
  //         <AlertWindow message={error.message} alertType="error" />
  //       )})
  //       })
  //       dispatch({type:"WINDOW_ACTIVATED",payload:true})
        setAvatarPreview("")
      // .then((data) => console.log(data))
      // .catch((error) => console.log(error));
}

if(avatarPreview != ""){
  uploadButton = (<div className="profileFormField">
              <button
                type="submit"
               // disabled={!formik.isValid}
                onClick={uploadAvatar}
                className="uploadButton"
              >
                Upload
              </button>
            </div>)
}

const buttonDesign = {
  buttonClass: "profileFormData"
}

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="profileForm">
            <div className="profileFormContent">
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="text"
                label="First Name:"
                name="firstName"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="text"
                label="Last Name:"
                name="lastName"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="date"
                label="Choose your birth date:"
                name="birthDate"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="text"
                label="address:"
                name="address"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="text"
                label="city:"
                name="city"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="text"
                label="country:"
                name="country"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="number"
                label="Phone Number:"
                name="phoneNumber"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <Textarea
                label="About Me:"
                name="aboutMe"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                placeholder="Write few sentences about yourself"
                value={aboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div className="profileFormField">
              <FormikControl
                control="input"
                type="file"
                labelClass="profileFormLabel"
                inputClass="profileFormInput"
                inputError="profileFormError"
                label="Choose your avatar:"
                name="avatar"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  formik.handleChange(e);
                  setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <div className="profileFormField">
            <img className="avatarPreview" src={avatarPreview} />
</div>
            {uploadButton}
            <div className="profileFormField">
              <button
                type="submit"
                disabled={!formik.isValid}
                onClick={onSubmit}
                className="saveButton"
              >
                Save
              </button>
            </div>
            <div className="profileFormField">
            <Button  address="/profileData" text="View profile Data" theme={buttonDesign}/>
            </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
