import excelToJson from "../../helpers/excelToJson";
import '../Transactions/UploadFile.css'

const UploadFile = props => {
    const{
        onUploadExcelFile
    } = props

    const convertExcelToObject = (file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        let result = excelToJson({ source: data });
       onUploadExcelFile(result.Transactions);
      };
          reader.readAsArrayBuffer(file);
    };
    
    const dropHandler = (event) => {
      event.preventDefault();
      if(event.dataTransfer && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        convertExcelToObject(file);
      }else{
        console.log("No file selected");
      }
    //   const file = event.target.files[0];
    //   convertExcelToObject(file);
    };
  
    const uploadFileHandler = (event) => {
      const file = event.target.files[0];
      convertExcelToObject(file);
    };
  
    const dragOverHandler = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className="uploadFile">
        <label>Upload your Excel file:</label>
        <div>
          <label onDrop={dropHandler} onDragOver={dragOverHandler} htmlFor="file">
            <div>
              <input
                onChange={uploadFileHandler}
                id="file"
                type="file"
                accept=".xlsx, .xls, .csv"
              />
              <div>or drop excel files here</div>
            </div>
          </label>
        </div>
      </div>
    );
  };
  
  export default UploadFile;