import { useEffect } from "react";
import { excelDateToJson } from "../../helpers/excelDateToJson";
import "../Transactions/DisplayData.css";

const DisplayData = props => {
  const {
    excelData,
    setData
  } = props

  let dataForDb = [];

  useEffect(() => {
    if (dataForDb.length > 1) {
      setData(dataForDb)
    }
  }, [excelData, setData])

  if (!excelData.length) {
    return <div className="noFileContainer">No File Uploaded</div>;
  }
  const table = excelData;
  const tableBody = table?.slice(1);
  const tableHead = table[0];
  const keys = Object.keys(tableHead);

  tableBody.forEach(row => {
    dataForDb.push({
      transactionDate: excelDateToJson(row.A),
      transactionAccount: row.B,
      category: row.C,
      item: row.D,
      sum: row.E,
      transactionType: row.F,
      currency: row.G
    });
  });

  tableBody.forEach(row => {
    if (typeof row.A === "number") {
      row.A = excelDateToJson(row.A).toLocaleDateString("ro-RO");
    }
  });

  return (
    <div className="displayData">
      <table>
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index}>{tableHead[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, index) => (
            <tr key={index}>
              {keys.map((key, index) => (
                <td key={index}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;