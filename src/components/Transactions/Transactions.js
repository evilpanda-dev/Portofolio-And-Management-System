import { useState } from "react";
import { generateAndDownloadExcel,saveToDatabase } from "../../api/displayDataApi"
import UploadFile from "./UploadFile.js"
import DisplayData from "./DisplayData.js";
import { getDatabaseData } from "../../api/displayDataApi.js";

const Transactions = () => {
    const [uploadedExcelData, setUploadedExcelData] = useState([]);
    const [dataForDb, setDataForDb] = useState([]);
    const [isViewingData, setIsViewingData] = useState(false);

  const uploadedExcelDataHandler = (data) => {
    setUploadedExcelData(data);
  };
  
  const viewDatabaseTable = () => {
    setIsViewingData(true);
    getDatabaseData()
  }

    return(
        <>
        <h1 className="transactionsTitle">Transactions</h1>
        <button onClick={()=>{
            generateAndDownloadExcel("generateExcel","GET")
        }}>Download Excel</button>
        <button onClick={()=>{
            saveToDatabase(dataForDb)
        }}>Save to database</button>
        <button onClick={viewDatabaseTable}>View database table</button>
        <div>
        <UploadFile onUploadExcelFile={uploadedExcelDataHandler} />
      <DisplayData excelData={uploadedExcelData} setData={setDataForDb}/>
        </div>
        </>
    )
}


export default Transactions