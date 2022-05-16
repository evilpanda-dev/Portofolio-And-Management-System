import { useState } from "react";
import { generateAndDownloadExcel,saveToDatabase } from "../../api/displayDataApi"
import UploadFile from "./UploadFile.js"
import DisplayData from "./DisplayData.js";
import { getDatabaseData } from "../../api/displayDataApi.js";
import TransactionTable from "./TransactionTable/TransactionTable";
import './Transactions.css'
import LineChart from "../Charts/LineChart";
import MorePieCharts from "../Charts/MorePieCharts";

const Transactions = () => {
    const [uploadedExcelData, setUploadedExcelData] = useState([]);
    const [dataForDb, setDataForDb] = useState([]);
    const [isViewingData, setIsViewingData] = useState(false);

  const uploadedExcelDataHandler = (data) => {
    setUploadedExcelData(data);
  };
  
  const viewDatabaseTable = () => {
    setIsViewingData(true);
  }

    return(
        <>
        <h1 className="transactionsTitle">Personal transactions</h1>
        <div>
        <UploadFile onUploadExcelFile={uploadedExcelDataHandler} />
      <DisplayData excelData={uploadedExcelData} setData={setDataForDb}/>
        </div>
        <button className="excelDownloadButton" onClick={()=>{
            generateAndDownloadExcel("generateExcel","GET")
        }}>Download Excel</button>
        <button className="saveToDbButton" onClick={()=>{
            saveToDatabase(dataForDb)
        }}>Save to database</button>
        <button className="viewDbTableButton" onClick={viewDatabaseTable}>View database table</button>
        {isViewingData && (
          <>
          <TransactionTable />
          <h1 className="transactionsTitle">Expense chart</h1>
          <LineChart transactionType="Expense"/>
          <h1 className="transactionsTitle">Income chart</h1>
          <LineChart transactionType="Income"/>
          <MorePieCharts/>
          </>
        )}
        </>
    )
}


export default Transactions