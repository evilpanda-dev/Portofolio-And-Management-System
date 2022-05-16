import "../TimeLine/TimeLine_styles/base.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext,useState,useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useDispatch } from "react-redux";
import { useFormik,getIn } from "formik";
import * as Yup from "yup";
import { addNewEducation,updateEducation,removeEducation } from "../../features/education/educationSlice";
import { useAlert } from "../../hooks/useAlert";

const validationSchema = Yup.object({
  date: Yup.number().required("Date is a required field")
  .typeError("Date must be a “number”"),
  title: Yup.string().required("Title is a required field")
  .min(5, "Title must be greater than or equal to 5")
  .max(100, "Title must be less than or equal to 50"),
  description: Yup.string().required("Description is a required field")
  .min(5, "Description must be greater than or equal to 5")
  .max(1000, "Description must be less than or equal to 50"),
});

const TimeLine = () => {
  const educations = useSelector(
    (state) => state.educationState.educationList
  );
  const { status, error } = useSelector((state) => state.educationState);
  const isEditing = useSelector((state) => state.editEducationState.editEducation);
const {user } = useContext(UserContext);
const dispatch= useDispatch();
const [date,setDate] = useState("")
const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [hoveredItem,setHoveredItem] = useState()
const [admin,setAdmin] = useState(false)
const triggerAlert = useAlert()

const activateEdit = () => {
  dispatch({ type: "EDITEDUCATION_ACTIVATED", payload: true });
};

const deactivateEdit = () => {
  dispatch({ type: "EDITEDUCATION_DEACTIVATED", payload: false });
};

const changeButtonState = () => {
  isEditing ? deactivateEdit() : activateEdit();
};

  useEffect(()=>{
    if(user.role === "Admin"){
  setAdmin(true)
    } else {
      setAdmin(false)
      deactivateEdit()
    } 
  },[user.role])

  const getStyles = (errors, fieldName) => {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
  });

  const handleAction = async (e) => {
    e.preventDefault();
   const data = await dispatch(addNewEducation({ educationDate: date, educationTitle: title, educationDescription: description }))
   triggerAlert(data,"Education added successefully")
    setDate("");
    setTitle("");
    setDescription("");
    deactivateEdit();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const enteredId = prompt("Enter the id of the education you want to update");
const data = await dispatch(updateEducation({ educationId: enteredId, educationDate: date, educationTitle: title, educationDescription: description }))
triggerAlert(data,"Education updated successefully")
setDate("");
    setTitle("");
    setDescription("");
    deactivateEdit();
  }

  const handleDelete = async (e) =>{
    e.preventDefault();
    const enteredId = prompt("Enter the id of the education you want to remove");
   const data = await dispatch(removeEducation({ educationId: enteredId }))
    triggerAlert(data,"Education removed successefully")
    setDate("");
    setTitle("");
    setDescription("");
    deactivateEdit();
  }

  return (
    <section id="timeLine">
      <h1 className="educationSection">Education</h1>
      {admin && (
        <div className="openEditButton">
        <button className="openEdit" onClick={changeButtonState}>
          <i className="openEditIcon">
            <FontAwesomeIcon icon={solid("pen-to-square")} />
          </i>
          <span>Open edit</span>
        </button>
      </div>
      )}
      {status === "loading" && (
        <div className="loadingContainer">
          <FontAwesomeIcon icon={solid("rotate")} className="loading" />
        </div>
      )}
      {error && (
        <h3 className="error">
          Something went wrong, please review your server connection!
        </h3>
      )}
      {status === "resolved" && (
        <div className="timelineContainer">
          {isEditing && (
              <div className="educationDataWrapper">
                <form id="educationForm">
                  <div className="dateWrapper">
                    <label htmlFor="date" className="educationLabel">
                      Year of graduation : 
                    </label>
                    <input
                      id="type"
                      name="date"
                      type="text"
                      placeholder="Enter date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationInput"
                      style={getStyles(formik.errors, "date")}
                    />
                    {formik.errors.date ? (
                      <div className="errorMessage">{formik.errors.date}</div>
                    ) : null}
                  </div>

                  <div className="titleWrapper">
                    <label htmlFor="title" className="educationLabel">
                      Name of institution : 
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter the name of institution"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationInput"
                      style={getStyles(formik.errors, "title")}
                    />
                    {formik.errors.title ? (
                      <div className="errorMessage">{formik.errors.title}</div>
                    ) : null}
                  </div>

                  <div className="textWrapper">
                    <label htmlFor="description" className="educationLabel">
                      Write something interesting about your qualification :
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      placeholder="How was your experience?"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationTextArea"
                      style={getStyles(formik.errors, "description")}
                    />
                    {formik.errors.description ? (
                      <div className="errorMessage">{formik.errors.description}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    onClick={handleAction}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButtonEducation"
                  >
                    Add
                  </button>
                  <button
                    type="submit"
                    onClick={handleUpdate}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButtonEducation"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    onClick={handleDelete}
                    className="submitButtonEducation"
                  >
                    Remove
                  </button>
                </form>
              </div>
            )}
          <div id="timeline" className="timelineWrapper">
            {educations.map(({ id, date, title, text }) => (
              <div className="timeline-item" key={id} onMouseEnter={
                ()=>{ 
                setHoveredItem(id)
                }}
                onMouseLeave = {
                  ()=>{
                    setHoveredItem(0)
                  }
                }>
                <span className="timeline-icon">
                  <span>&nbsp;&nbsp;</span>
                  <span className="year">{date}</span>
                </span>
                <div className="timeline-content">
                {admin && hoveredItem === id && (
                  <h3>{"This item's id is " + id}</h3>
                )}
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TimeLine;
