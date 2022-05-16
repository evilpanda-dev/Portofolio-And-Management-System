import { useState } from "react";
import FilterButton from "../Button/FilterButton";
import Chart from "./Chart";

const Charts = props => {
  const { data } = props;

  const allCategories = ["All", ...new Set(data.map((item) => item.category))];

  const [menuItems, setMenuItems] = useState(data);
  const [categories] = useState(allCategories);

  const filterItem = (category) => {
    if (category === "All") {
      setMenuItems(data);
      return;
    }
    const newItem = data.filter((item) => item.category === category);
    setMenuItems(newItem);
  };
  return (
    <>
      <h1 className="statsTitle">Personal developer stats</h1>
      <div >
        <FilterButton categories={categories} filterItem={filterItem} />
      </div>

      <div className="row">
        {menuItems.map((project) => (
          <Chart
            url={project.src}
            key={project.id}
          />
        ))}
      </div>
    </>
  )
}

export default Charts