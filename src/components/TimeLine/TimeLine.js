import "../TimeLine/TimeLine_styles/base.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext,useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useDispatch } from "react-redux";
import { useFormik,getIn } from "formik";
import * as Yup from "yup";

const TimeLine = () => {
  const educations = useSelector(
    (state) => state.educationState.educationList
  );

  const { status, error } = useSelector((state) => state.educationState);
  const isEditing = useSelector((state) => state.editEducationState.editEducation);
const {user } = useContext(UserContext);
const dispatch= useDispatch();
const [type, setType] = useState("");
  const [range, setRange] = useState("");

const activateEdit = () => {
  dispatch({ type: "EDITEDUCATION_ACTIVATED", payload: true });
};

const deactivateEdit = () => {
  dispatch({ type: "EDITEDUCATION_DEACTIVATED", payload: false });
};

const changeButtonState = () => {
  isEditing ? deactivateEdit() : activateEdit();
};

  let editButton ;
  if(user.role === "Admin"){
editButton = (
  <div className="openEditButton">
          <button className="openEdit" onClick={changeButtonState}>
            <i className="openEditIcon">
              <FontAwesomeIcon icon={solid("pen-to-square")} />
            </i>
            <span>Open edit</span>
          </button>
        </div>
)
  }

  const getStyles = (errors, fieldName) => {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Skill name is a required field"),

    range: Yup.number()
      .typeError("Skill Range must be a “number” from 10 to 100.")
      .min(10, "Skill range must be greater than or equal to 10")
      .max(100, "Skill range must be less than or equal to 100")
      .required("Skill range is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      range: "",
    },

    validationSchema: validationSchema,
  });


  const handleAction = (e) => {
    e.preventDefault();
    //dispatch(addNewSkill({ skillName: type, skillRange: range }));
    setType("");
    setRange("");
    deactivateEdit();
  };

  return (
    <section id="timeLine">
      <h1 className="educationSection">Education</h1>
      {editButton}
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
                    <label htmlFor="type" className="educationLabel">
                      Skill name:{" "}
                    </label>
                    <input
                      id="type"
                      name="name"
                      type="text"
                      placeholder="Enter skill name"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationInput"
                      style={getStyles(formik.errors, "name")}
                    />
                    {formik.errors.name ? (
                      <div className="errorMessage">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="titleWrapper">
                    <label htmlFor="level" className="educationLabel">
                      Skill range:{" "}
                    </label>
                    <input
                      id="level"
                      name="range"
                      type="text"
                      placeholder="Enter skill range"
                      value={range}
                      onChange={(e) => {
                        setRange(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationInput"
                      style={getStyles(formik.errors, "range")}
                    />
                    {formik.errors.range ? (
                      <div className="errorMessage">{formik.errors.range}</div>
                    ) : null}
                  </div>

                  <div className="textWrapper">
                    <label htmlFor="type" className="educationLabel">
                      Skill name:{" "}
                    </label>
                    <textarea
                      id="type"
                      name="name"
                      type="text"
                      placeholder="Enter skill name"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        formik.handleChange(e);
                      }}
                      className="educationTextArea"
                      style={getStyles(formik.errors, "name")}
                    />
                    {formik.errors.name ? (
                      <div className="errorMessage">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    onClick={handleAction}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButtonEducation"
                  >
                    Add skill
                  </button>
                  <button
                    type="submit"
                    //onClick={updateSkill}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButtonEducation"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    //onClick={deleteSkill}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButtonEducation"
                  >
                    Remove
                  </button>
                </form>
              </div>
            )}
          <div id="timeline" className="timelineWrapper">
            {educations.map(({ id, date, title, text }) => (
              <div className="timeline-item" key={id}>
                <span className="timeline-icon">
                  <span>&nbsp;&nbsp;</span>
                  <span className="year">{date}</span>
                </span>
                <div className="timeline-content">
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
