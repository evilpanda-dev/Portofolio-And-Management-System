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
import { getDatabaseData } from "../../../api/displayDataApi";

const TransactionTable = () => {
    const [dataFromDb, setDataFromDb] = useState([]);
    const [tableCurrentPage, setTableCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(10);

    useEffect(()=>{
      getDatabaseData(tableCurrentPage,rowsPerPage).then(data => {
        setDataFromDb(data.transactions);
        setTotalPages(data.pages);
        setTotalItems(data.totalItems);
      })
    },[tableCurrentPage,rowsPerPage])

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

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalItems.length - tableCurrentPage * rowsPerPage);
    
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Date</TableCell>
              <TableCell align="right">Transaction Account</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Transaction Type</TableCell>
              <TableCell align="right">Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFromDb
              // .slice(tableCurrentPage * rowsPerPage, tableCurrentPage * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.transactionDate}
                  </TableCell>
                  <TableCell align="right">{row.transactionAccount}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.item}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.transactionType}</TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={tableCurrentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
}

export default TransactionTable