import PhotoBox from "../../components/PhotoBox/PhotoBox";
import Button from "../../components/Button/Button";

import "../Home/Home.css";

const Home = () => {
  const homePhotoBox = {
    imageClass: "avatar",
    nameClass: "name",
    titleClass: "title",
    descriptionClass: "description",
    wrapper: "photoBoxWrapper",
  };

  const homeButton = {
    buttonClass: "homeButton",
  };

  return (
    <>
      <div className="mainPage">
        <div className="photoBoxWrapper">
          <div>
            <PhotoBox
              name="John Doe"
              title="Programmer. Creative. Innovator"
              description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
              avatar="http://avatars0.githubusercontent.com/u/246180?v=4"
              theme={homePhotoBox}
            />
            <Button address="/Inner" text="Know more" theme={homeButton} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
