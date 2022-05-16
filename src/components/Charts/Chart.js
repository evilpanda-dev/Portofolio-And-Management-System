import "../Portofolio/PortofolioInfo.css";

const Chart = (props) => {
  const { url } = props;

  return (
    <>
      <div className="column">
        <div className="container">
          <figure className="chart">
            <embed src={url}></embed>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Chart;
