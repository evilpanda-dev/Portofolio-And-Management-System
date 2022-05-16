import { useState } from "react";
import FilterButton from "../Button/FilterButton";
import PieChart from "./PieChart";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const MorePieCharts = () => {
      const allCategories = ["All", ...new Set(months.map((item) => item))];
    
      const [menuItems, setMenuItems] = useState(months);
      const [categories] = useState(allCategories);
    
      const filterItem = (category) => {
        if (category === "All") {
          setMenuItems(months);
          return;
        }
        const newItem = months.filter((item) => item === category);
        setMenuItems(newItem);
      };

    return(
        <div>
          <h1 className="transactionsTitle">Expense pie chart with categories</h1>
          <div >
          <FilterButton categories={categories} filterItem={filterItem} />
        </div>
          {menuItems.map((month,index)=>{
            return(
              <div className="pieChart" key={index}>
              <PieChart month={month} transactionType="Expense" key={index}/>
              </div>
            )
          })}
          <h1 className="transactionsTitle">Income pie chart with categories</h1>
          {menuItems.map((month,index)=>{
            return(
              <div className="pieChart" key={index}>
              <PieChart month={month} transactionType="Income" key={index}/>
              </div>
            )
          })}
          </div>
    )
}

export default MorePieCharts;