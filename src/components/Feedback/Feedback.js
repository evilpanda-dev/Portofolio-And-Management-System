import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Comments from "./Comments";

const Feedback = (props) => {
  const { imageSrc } = props;
  const {user} = useContext(UserContext)

  return (
    <>
      <section id="feedBack">
        <h1 className="feedbackSection">Feedbacks</h1>
        <Comments currentUserId = {user.userId} currentUserName={user.userName} currentAvatar ={imageSrc}/>
      </section>
    </>
  );
};

export default Feedback;
