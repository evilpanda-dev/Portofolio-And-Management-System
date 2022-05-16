import { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table" ;
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import TableSortLabel  from "@material-ui/core/TableSortLabel";
import { getDatabaseData, searchForData, sortData } from "../../../api/displayDataApi";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const TransactionTable = () => {
    const [dataFromDb, setDataFromDb] = useState([]);
    const [tableCurrentPage, setTableCurrentPage] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(5);
    const [searched,setSearched] = useState("")
    const [order,setOrder] = useState("asc")
    const [orderBy,setOrderBy] = useState("TransactionDate")
    const [minPrice,setMinPrice] = useState(0)
    const [maxPrice,setMaxPrice] = useState(0)
    const [errors,setErrors] = useState({minimumPriceError: "", maximumPriceError:"",itemError:""})
    const [isFiltering,setIsFiltering] = useState(false)
    const [item,setItem] = useState("")

    let queryParams = Object.assign({},
      rowsPerPage === null ? null : {pageSize: rowsPerPage},
      tableCurrentPage === null ? null : {pageNumber: tableCurrentPage},
      minPrice === 0 ? null : {minPrice: minPrice},
      maxPrice === 0 ? null : {maxPrice: maxPrice},
      item === "" ? null : {item: item},
      searched === "" ? null : {search: searched.toLowerCase()},
      orderBy === "TransactionDate" ? null : {orderByProperty: orderBy},
      order === "asc" ? null : {orderDirection: order}
    )

    useEffect(()=>{
      getDatabaseData(queryParams).then(data => {
        setDataFromDb(data.transactions);
        // setTotalPages(data.pages);
        setTotalItems(data.totalItems);
      })
      if(dataFromDb.length === 0){
        setTableCurrentPage(0)
      }
    },[tableCurrentPage,rowsPerPage,isFiltering,orderBy])

    const useStyles = makeStyles({
        table: {
          minWidth: 650
        }
      });
    const classes= useStyles();

    const handleChangePage = (event, newPage) => {
        setTableCurrentPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setTableCurrentPage(0);
    }

    const requestSearch = (searchedVal) =>{
      setIsFiltering(true)
      setSearched(searchedVal)
    }

    const cancelSearch = () =>{
      setSearched("");
      setIsFiltering(false)
    }

    const requestSort = (element) => {
        const isAsc = order === "asc" ? "desc" : "asc";
          setOrder(isAsc);
          setOrderBy(element);
          setIsFiltering(true)
        // setOrder(isAsc);
        // setOrderBy(element);
    }

    const handleFormChange = (event) => {
      const {target : {value}} = event
        if(event.target.name === "minimumPrice"){
          if(value < 0 ){
            setErrors({minimumPriceError: "Minimum price must be greater than 0"})
          }else if(value > 0){
            setErrors({minimumPriceError: ""})
            setMinPrice(value)
          }
        }
        if(event.target.name === "maximumPrice"){
          if(value < 0 ){
            setErrors({maximumPriceError: "Maximum price must be greater than 0"})
          } else if (value>0){
            setErrors({maximumPriceError: ""})
            setMaxPrice(value)
          }
        }
        if(event.target.name === "item"){
          if(typeof value === 'string' || value instanceof String){
            setErrors({itemError: ""})
            setItem(value)
          } else { 
            setErrors({itemError: "Item must be a text"})
          }
        }
    }

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalItems - tableCurrentPage * rowsPerPage);
    
    if(dataFromDb !== undefined && dataFromDb.length > 0){
      dataFromDb.forEach(row => {
        if(row.transactionDate){
          row.transactionDate = row.transactionDate.split('T')[0];
        }
      });
    }

    return (
      <>
      {dataFromDb !== null && dataFromDb !== undefined ? (
        <TableContainer component={Paper} style={{"maxHeight" : "600px"}}>
          <SearchBar
          value={searched}
          onRequestSearch={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("TransactionDate")}} direction={order}>Transaction Date</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("TransactionAccount")}} direction={order}>Transaction Account</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("Category")}} direction={order}>Category</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("Item")}} direction={order}>Item</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("Sum")}} direction={order}>Sum</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("TransactionType")}} direction={order}>Transaction Type</TableSortLabel></TableCell>
              <TableCell><TableSortLabel align="center" onClick={()=>{requestSort("Currency")}} direction={order}>Currency</TableSortLabel></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFromDb.length > 0 ? dataFromDb.map((row) => (
              // .slice(tableCurrentPage * rowsPerPage, tableCurrentPage * rowsPerPage + rowsPerPage)
              // .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.transactionDate}
                  </TableCell>
                  <TableCell align="center">{row.transactionAccount}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.item}</TableCell>
                  <TableCell align="center">{row.sum}</TableCell>
                  <TableCell align="center">{row.transactionType}</TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No data found</TableCell>
                  </TableRow>
                  )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,{ label: 'All', value: totalItems }]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={tableCurrentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TextField
          id="outlined-number"
          label="Minimum Price"
          type="number"
          name="minimumPrice"
          InputLabelProps={{
            shrink: true,
          }}
          variant = "outlined"
          style={{
            marginLeft : "10px",
            marginBottom : "10px"
          }}
          value={minPrice}
          onChange={handleFormChange}
          error={Boolean(errors?.minimumPriceError)}
          helperText={(errors?.minimumPriceError)}
        />
        <TextField
          id="outlined-number"
          label="Maximum Price"
          type="number"
          name="maximumPrice"
          variant = "outlined"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            marginLeft : "10px",
          }}
          required
          value={maxPrice}
          onChange={handleFormChange}
          error={Boolean(errors?.maximumPriceError)}
          helperText={(errors?.maximumPriceError)}
        />
         <TextField
          id="outlined-number"
          label="Item"
          type="input"
          name="item"
          variant = "outlined"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            marginLeft : "10px",
          }}
          required
          value={item}
          onChange={handleFormChange}
          error={Boolean(errors?.itemError)}
          helperText={(errors?.itemError)}
        />
        <Button 
        variant="contained" 
        color="primary" 
        style={{
          marginLeft : "10px",
          marginTop : "10px"
          }}
          type="submit"
        text="Submit"
        onClick={()=>{
          setIsFiltering(true)
        }}> Submit</Button>
        <Button 
        variant="contained" 
        color="secondary" 
        style={{
          marginLeft : "10px",
          marginTop : "10px"}}
        onClick={()=>{
          setMinPrice(0);
          setMaxPrice(0);
          setItem("");
          setErrors({minimumPriceError: "", maximumPriceError: "", itemError: ""})
          setIsFiltering(false)
        }}
        >Reset</Button>
      </TableContainer>
      ) : (
        <div style={{"textAlign" : "center"}}> No data in database</div>
      )}
      </>
    );
}

export default TransactionTable