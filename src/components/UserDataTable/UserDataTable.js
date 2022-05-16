import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import { getDatabaseData } from "../../api/userDataApi";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const UserDataTable = () => {
    const [dataFromDb, setDataFromDb] = useState([]);
    const [tableCurrentPage, setTableCurrentPage] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(5);

    const classes = useStyles();

    let queryParams = Object.assign({},
        rowsPerPage === null ? null : {pageSize: rowsPerPage},
        tableCurrentPage === null ? null : {pageNumber: tableCurrentPage},
      )

    useEffect(()=>{
        getDatabaseData(queryParams).then(data => {
          setDataFromDb(data.userData);
          setTotalItems(data.totalItems);
        })
        if(dataFromDb.length === 0){
          setTableCurrentPage(0)
        }
      },[tableCurrentPage,rowsPerPage])

      const handleChangePage = (event, newPage) => {
        setTableCurrentPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setTableCurrentPage(0);
    }

    const handleEdit = values => {
      console.log("The Values that you wish to edit ", values);
    };

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalItems - tableCurrentPage * rowsPerPage);
    
    if(dataFromDb.length > 0 ){
      dataFromDb.forEach(row => {
        if(row.birthDate){
          row.birthDate = row.birthDate.split('T')[0];
        }
      });
    }

    return(
        <>
        <h1 className="transactionsTitle">Registered users</h1>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User id</TableCell>
            <TableCell align="center">User name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">First name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">Birth date</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Phone number</TableCell>
            <TableCell align="center">About him</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataFromDb.length > 0 ? dataFromDb.map((row) => (
              // .slice(tableCurrentPage * rowsPerPage, tableCurrentPage * rowsPerPage + rowsPerPage)
              // .map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.birthDate}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{row.aboutMe}</TableCell>
                  <TableCell align="center">
                <Button aria-label="edit" onClick={() => handleEdit(row)}>
                  Edit
                </Button>
              </TableCell>
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
    </TableContainer>
        </>
    )
}

export default UserDataTable;