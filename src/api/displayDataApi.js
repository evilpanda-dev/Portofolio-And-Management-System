import ajax from "ajax"
import axios, { AxiosRequestConfig, Method } from 'axios';
import { saveAs } from 'file-saver';
import excelToJson from '../helpers/excelToJson.js';

let XLSX = require("xlsx")

let _oTransactions = [{}]
let _oTransaction = null
let _headers = []

export const generateAndDownloadExcel = (url,method) => {
      let instance = axios.create({  baseURL: "https://localhost:5000/api/" });  
      let options = { 
        url,
        method,
        // responseType: 'blob' 
      };  
      return instance.request(options)
        .then(response => { 
        //   console.log(response.data) 
        ExcelFromBase64("Transactions.xlsx",response.data) 
      });
}

const ExcelFromBase64 = (fileName, bytesBase64) => {
let link = document.createElement("a");
link.download = fileName;
link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + bytesBase64;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

// export const convertExcelToObject = (file) => {
//       if(!file) return;
  
//       let fr = new FileReader();
//       fr.onload = (e) => {
//           let data = new Uint8Array(e.target.result);
//           let workbook = XLSX.read(data, {type: 'array'});
//           let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//           let result = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
//           console.log(result)
//       }
//       fr.readAsArrayBuffer(file);
//   }

  export const saveToDatabase = (data) => {
    let instance = axios.create({  baseURL: "https://localhost:5000/api/" });  
    let options = { 
      url: "saveExcel",
      method: "POST",
      data
    };  
    return instance.request(options)
    //   .then(response => { 
    //     console.log(response.data) 
    // });
  }

// export const createAndShowTable = (e) => {
//     let file = e.target.files[0];
//     if(!file) return;

//     let fr = new FileReader();
//     fr.onload = (e) => {
//         let data = new Uint8Array(e.target.result);
//         let workbook = XLSX.read(data, {type: 'array'});
//         let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//         let result = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
//         generateTable(result);
//     }
//     fr.readAsArrayBuffer(file);
// }

// const reset = () =>{
//     _oTransactions = []
//     _oTransaction = null
//     _headers = []
//     // document.getElementById("#tblMain").remove()
// }

// const generateTable = (exportStatus) => {
//     reset()
// if(exportStatus.length >0){
// let sTemp = ""
// let headers = exportStatus[2]
// sTemp="<tr>"
// sTemp += "<th style='text-align:center;vertical-align:middle;'>Serial</th>";

// exportStatus.map(header=>{
// _headers.push(header)
// sTemp += "<th style='text-align:center;vertical-align:middle;min-width:100px;'>" + header + "</th>";
// })
// sTemp += "</tr>";


// exportStatus = exportStatus.slice(3)
// exportStatus = exportStatus !=null ? exportStatus.filter(x => x.length > 0) : exportStatus
// var nSL = 0;
// for ( let i =0 ; i < exportStatus.length; i++){
//     nSL ++;
//     _oTransaction = NewTransactionObj()
//     sTemp = "<tr>"
//     sTemp += "<td style='text-align:center;vertical-align:middle;'>" + nSL + "</td>";

//     let valueIndex = 0;
//     let es = exportStatus[i]
// let propValue
//     for(let j = 0; j < headers.length; j++){
//         propValue = es[j]
//         propValue = typeof (propValue) == "undefined" ? "" : propValue;

//         let propName = headers[valueIndex]
//         _oTransaction[propName] = propValue
//         sTemp += "<td style='text-align:center;vertical-align:middle;' title='" + headers[valueIndex] + "'>" + propValue + "</td>";
//         valueIndex++;
//     }
//     sTemp += "</tr>";
    
//     _oTransactions.push(_oTransaction)
// }
// }
// }


// export const saveExcel = (url,method) => {
//     if(_oTransactions.length > 0){
//         let instance = axios.create({  baseURL: "https://localhost:5000/api/" });  
//           let options = { 
//             url,
//             method,
//             data : {transactions : _oTransactions},
//             dataType : "json",
//             // responseType: 'blob' 
//           };  
//           return instance.request(options)
//           .then(response => { 
//           console.log(response.data) 
//         });
// // if(_oTransactions.length > 0){
// //     let ajaxRequest = ajax({
// //         url: `http://localhost:5000/api/saveExcel`,
// //         type: "POST",
// //         data: {transactions: _oTransactions},
// //         dataType : "json",
// //         beforeSend: () => {

// //         }
// //     })
// //     ajaxRequest.done((data) => {
// //     alert("Successfully saved")
// //     })
// //     ajaxRequest.fail((jqXHR, textStatus) => {
// //         alert("Error Found"); 
// //         alert('error title', 'error info', 'error'); 
// //     })
// } else {
//     alert("No data to save")
// }
// }

// const NewTransactionObj = () => {
//     let oTransaction = {
//         id: 0,
//         transactionDate: "",
//         transactionAccount: "",
//         category: "",
//         item: "",
//         amount: 0,
//         transactionType: "",
//         currency: ""
//     }
//     return oTransaction
// }
