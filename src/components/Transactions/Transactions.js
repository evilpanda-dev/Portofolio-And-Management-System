import { useState } from "react";
import { generateAndDownloadExcel,saveToDatabase } from "../../functions/excelUtils"
import UploadFile from "./UploadFile.js"
import DisplayData from "./DisplayData.js";

const Transactions = () => {
    const [uploadedExcelData, setUploadedExcelData] = useState([]);
    const [dataForDb, setDataForDb] = useState([]);
  const uploadedExcelDataHandler = (data) => {
    setUploadedExcelData(data);
  };
  
  // console.log(dataForDb)
    return(
        <>
        <h1 className="transactionsTitle">Transactions</h1>
        <button onClick={()=>{
            generateAndDownloadExcel("generateExcel","GET")
        }}>Download Excel</button>
        <button onClick={()=>{
            saveToDatabase(dataForDb)
        }}>Save to database</button>
        <div>
        <UploadFile onUploadExcelFile={uploadedExcelDataHandler} />
      <DisplayData excelData={uploadedExcelData} setData={setDataForDb}/>
        </div>
        </>
    )
}


export default Transactions