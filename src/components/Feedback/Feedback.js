import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Info from "../Info/Info";
import Comments from "./Comments";

const Feedback = (props) => {
  const { imageSrc } = props;
  const {user} = useContext(UserContext)

  return (
    <>
      <section id="feedBack">
        <h1 className="feedbackSection">Feedbacks</h1>
        <Comments currentUserId = {user.userId} currentUserName={user.userName} currentAvatar ={imageSrc}/>
        {/* {data.map((user) => (
          <div className="feedbackWrapper" key={user.reporter.name}>
            <Info text={user.feedback} />
            <div className="userDetails">
              <img
                src={user.reporter.photoUrl}
                className="feedbackAvatar"
                alt={user.reporter.name}
              ></img>
              <p className="feedbackName">{user.reporter.name},</p>
              <a href={user.reporter.citeUrl} className="feedbackUrl">
                {" "}
                {user.reporter.citeUrl}
              </a>
            </div>
          </div>
        ))} */}
      </section>
    </>
  );
};

export default Feedback;
