import React, { useState, useEffect,useContext } from "react";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addNewSkill, fetchSkills,removeSkill,updateSkillRange } from "../../features/skills/skillSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import scale from "../../assets/images/scale.png";
import "../Skills/Skill.css";
import { UserContext } from "../../providers/UserProvider";
import { AlertContext } from "../../providers/AlertProvider";
import { useAlert } from "../../hooks/useAlert";

const validationSchema = Yup.object({
  name: Yup.string().required("Skill name is a required field"),

  range: Yup.number()
    .typeError("Skill Range must be a “number” from 10 to 100.")
    .min(10, "Skill range must be greater than or equal to 10")
    .max(100, "Skill range must be less than or equal to 100")
    .required("Skill range is a required field"),
});

let editButton ;

const Skills = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const { status, error } = useSelector((state) => state.skills);
  const [type, setType] = useState("");
  const [range, setRange] = useState("");
const {user} = useContext(UserContext);
const triggerAlert = useAlert();

  const handleAction = async (e) => {
    e.preventDefault();
    const data = await dispatch(addNewSkill({ skillName: type, skillRange: range }))
triggerAlert(data,"Skill added successefully")
    setType("");
    setRange("");
    deactivateEdit();
  };

  const getStyles = (errors, fieldName) => {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      range: "",
    },

    validationSchema: validationSchema,
  });

  const skillList = useSelector((state) => state.skills.skills);
  const isEditing = useSelector((state) => state.editState.edit);

  const activateEdit = () => {
    dispatch({ type: "EDIT_ACTIVATED", payload: true });
  };

  const deactivateEdit = () => {
    dispatch({ type: "EDIT_DEACTIVATED", payload: false });
  };

  const changeButtonState = () => {
    isEditing ? deactivateEdit() : activateEdit();
  };

  const deleteSkill = async (e) => {
    e.preventDefault();
    const data = await dispatch(removeSkill({skillName: type}))
    triggerAlert(data,"Skill removed successefully")
    setType("");
    setRange("");
    deactivateEdit();
  }

  const updateSkill = async (e) => {
    e.preventDefault();
   const data= await dispatch(updateSkillRange({skillName: type, skillRange: range}))
   triggerAlert(data,"Skill updated successefully")
    setRange("")
            setType("")
            deactivateEdit();
  }

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

  
  useEffect(()=>{
    if(user.userId == undefined){
      deactivateEdit()
    }
      },[isEditing])

  return (
    <>
      <section id="skills">
        <h1 className="skillSection">Skills</h1>
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
          <>
            {isEditing && (
              <div className="skillDataWrapper">
                <form id="skillForm">
                  <div className="nameWrapper">
                    <label htmlFor="type" className="skillLabel">
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
                      className="skillInput"
                      style={getStyles(formik.errors, "name")}
                    />
                    {formik.errors.name ? (
                      <div className="errorMessage">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="rangeWrapper">
                    <label htmlFor="level" className="skillLabel">
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
                      className="skillInput"
                      style={getStyles(formik.errors, "range")}
                    />
                    {formik.errors.range ? (
                      <div className="errorMessage">{formik.errors.range}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    onClick={handleAction}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButton"
                  >
                    Add skill
                  </button>
                  <button
                    type="submit"
                    onClick={updateSkill}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButton"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    onClick={deleteSkill}
                    disabled={!formik.dirty || !formik.isValid}
                    className="submitButton"
                  >
                    Remove
                  </button>
                </form>
              </div>
            )}
            <div>
              <ul className="skills">
                {skillList.map((skill) => (
                  <li
                    key={skill.name}
                    style={{ width: `${skill.range}%` }}
                  >
                    <p>
                      {skill.name}
                      <span></span>
                    </p>
                  </li>
                ))}
              </ul>
              <img src={scale} className="scale" alt="scale"></img>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Skills;
