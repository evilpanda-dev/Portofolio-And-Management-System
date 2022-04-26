import { Formik } from "formik";
import { useState } from "react";
import FormikControl from "../FormikControl/FormikControl";
import Textarea from "../TextArea/TextArea";
import * as Yup from "yup";

const initialValues = {
    FirstName: "",
    LastName: "",
    BirthDate: "",
    Address: "",
    City: "",
    Country: "",
    PhoneNumber: "",
    AboutMe: "",
    Avatar: "",
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string("First Name must be a text")
      .min(6, "First Name must be at least 6 characters")
      .max(50, "First Name must be less than 50 characters"),
    LastName: Yup.string("Last Name must be a text")
      .min(6, "Last Name must be at least 6 characters")
      .max(50, "Last Name must be less than 50 characters"),
    BirthDate: Yup.date("Birth Date must be a date"),
    Address: Yup.string("Address must be a text")
      .min(6, "Address must be at least 6 characters")
      .max(50, "Address must be less than 50 characters"),
    City: Yup.string("City must be a text")
      .min(6, "City must be at least 6 characters")
      .max(50, "City must be less than 50 characters"),
    Country: Yup.string("Country must be a text")
      .min(6, "Country must be at least 6 characters")
      .max(50, "Country must be less than 50 characters"),
    PhoneNumber: Yup.number("Phone Number must be a number")
      .min(6, "Phone Number must be at least 6 characters")
      .max(50, "Phone Number must be less than 50 characters"),
    AboutMe: Yup.string("About Me must be a text")
      .min(6, "About Me must be at least 6 characters")
      .max(100, "About Me must be less than 50 characters"),
  });

const ProfileForm = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [AboutMe, setAboutMe] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [AvatarPreview, setAvatarPreview] = useState("");

  

  const onSubmit = () => {
    let data = new FormData();
    // data.append("FirstName",FirstName);
    // data.append("LastName",LastName);
    // data.append("BirthDate",BirthDate);
    // data.append("Address",Address);
    // data.append("City",City);
    // data.append("Country",Country);
    // data.append("PhoneNumber",PhoneNumber);
    // data.append("AboutMe",AboutMe);
    data.append("Files", Avatar);

    return fetch("https://localhost:5000/api/avatar", {
      method: "POST",
      body: data,
      headers: new Headers({
        Accept: "application/json",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="First Name:"
                name="FirstName"
                placeholder="Enter your first name"
                value={FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="Last Name:"
                name="LastName"
                placeholder="Enter your last name"
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="date"
                label="Choose your birth date:"
                name="BirthDate"
                value={BirthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="Address:"
                name="Address"
                placeholder="Enter your address"
                value={Address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="City:"
                name="City"
                placeholder="Enter your city"
                value={City}
                onChange={(e) => {
                  setCity(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="text"
                label="Country:"
                name="Country"
                placeholder="Enter your country"
                value={Country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="number"
                label="PhoneNumber:"
                name="PhoneNumber"
                placeholder="Enter your phone number"
                value={PhoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <Textarea
                label="AboutMe:"
                name="AboutMe"
                placeholder="Write few sentences about yourself"
                value={AboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="file"
                label="Choose your avatar:"
                name="Avatar"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  formik.handleChange(e);
                  setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <img width={"250px"} src={AvatarPreview} />

            <div>
              <button
                type="submit"
                disabled={!formik.isValid}
                onClick={onSubmit}
              >
                Update
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
