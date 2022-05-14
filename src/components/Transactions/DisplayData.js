import { useEffect } from "react";
import { excelDateToJson } from "../../functions/excelDateToJson";
import "../Transactions/DisplayData.css";

const DisplayData = props => {
    const {
        excelData,
        setData
    } = props

    let dataForDb = [];
    useEffect(()=>{
      if(dataForDb.length > 1 ){
        setData(dataForDb)
      }
      },[excelData])

  if (!excelData.length) {
    return <div className="noFileContainer">No File Uploaded</div>;
  }
  const table = excelData ;
  const tableBody = table?.slice(1);
  const tableHead = table[0];
  const keys = Object.keys(tableHead);


 tableBody.forEach(row => {
    dataForDb.push({
      transactionDate: excelDateToJson(row.A),
      transactionAccount: row.B,
      Category: row.C,
      Item: row.D,
      Amount: row.E,
      transactionType: row.F,
      currency: row.G
    });
  });



  return (
    <div className="displayData">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th>{tableHead[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row) => (
            <tr key={row.id}>
              {keys.map((key) => (
                <td>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;