import ajax from "ajax"
import axios, { AxiosRequestConfig, Method } from 'axios';
import { saveAs } from 'file-saver';
import excelToJson from '../helpers/excelToJson.js';

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

  export const saveToDatabase = (data) => {
    let instance = axios.create({  baseURL: "https://localhost:5000/api/" });  
    let options = { 
      url: "saveExcel",
      method: "POST",
      data
    };  
    return instance.request(options)
  }

  export const getDatabaseData = async(params) =>{
// const dispatch = useDispatch()
var url = new URL ("https://localhost:5000/api/getTransactions")
if (params != null) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

return (
     fetch(url, {
        method: "GET",
      }) 
      .then((response) => {
        return response.json()
      })
)
  }

//   export const searchForData = async (searchTransactions) => {
// return (
//   fetch(`https://localhost:5000/api/searchTransactions/${searchTransactions}`, {
//         method: "GET",
//       }) 
//       .then((response) => {
//         return response.json()
//       })
// )
//   }

//   export const sortData = async(sortBy,sortOrder) => {
//     return (
//       fetch(`https://localhost:5000/api/transactionsDescending/${sortBy}/${sortOrder}`, {
//         method: "GET",
//       }) 
//       .then((response) => {
//         return response.json()
//       })
//     )
//   }