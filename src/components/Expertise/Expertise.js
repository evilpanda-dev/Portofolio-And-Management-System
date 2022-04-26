const Expertise = (props) => {
  const { data } = props;
  return (
    <>
      <section id="experience">
        <h1 className="experienceSection">Experience</h1>
        {data.map((info) => (
          <div className="jobWrapper" key={info.info.job}>
            <div className="workCompany">
              <h4 className="companyName">{info.info.company}</h4>
              <h3 className="workingYear">{info.date}</h3>
            </div>
            <div className="workJob">
              <h4 className="jobTitle">{info.info.job}</h4>
              <h3 className="jobDescription">{info.info.description}</h3>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Expertise;
