import React,{useState,useEffect,useContext} from "react";
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
import { getCommentsData } from "../../api/userDataApi";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../../features/profileFormThunks";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { deleteComment } from "../../api/commentApi";
import { CommentCountContext } from "../../providers/CommentCountProvider";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const CommentsTable = () => {
    const [dataFromDb, setDataFromDb] = useState([]);
    const [tableCurrentPage, setTableCurrentPage] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(5);
    const [isDeleting,setDeleting] = useState(false)
    const {setCommentsCount} = useContext(CommentCountContext)
    const classes = useStyles();

    let queryParams = Object.assign({},
        rowsPerPage === null ? null : {pageSize: rowsPerPage},
        tableCurrentPage === null ? null : {pageNumber: tableCurrentPage},
      )

    useEffect(()=>{
        getCommentsData(queryParams).then(data => {
          setDataFromDb(data.comments);
          setTotalItems(data.totalItems);
          setDeleting(false)
          setCommentsCount({totalComments : totalItems})
        })
        if(dataFromDb.length === 0){
          setTableCurrentPage(0)
        }
      },[tableCurrentPage,rowsPerPage,isDeleting])

      const handleChangePage = (event, newPage) => {
        setTableCurrentPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setTableCurrentPage(0);
    }

    // let terminateWindow ;
    
    // const terminateAccount = values => {
    // //   console.log("The Values that you wish to edit ", values);
    // terminateWindow = (
    //     <ConfirmDialog anotherUserId={values.id}/>
    // )
    // };

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalItems - tableCurrentPage * rowsPerPage);
    
    if(dataFromDb.length > 0 ){
      dataFromDb.forEach(row => {
        if(row.createdAt){
          row.createdAt = row.createdAt.split('T')[0];
        }
      });
    }

    return(
        <>
        <h1 className="transactionsTitle">Users Comments</h1>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Comment id</TableCell>
            <TableCell align="center">User name</TableCell>
            <TableCell align="center">Comment</TableCell>
            <TableCell align="center">Is a reply?</TableCell>
            <TableCell align="center">Created at</TableCell>
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
                  <TableCell align="center">{row.text}</TableCell>
                  <TableCell align="center">{row.parentId ? "Yes" : "No"}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">
                {/* <ConfirmDialog anotherUserId={row.id}/> */}
                <Button variant="contained" color="default" onClick={() => {
                        deleteComment(row.id)
                        setDeleting(true)
                }}>DELETE</Button>
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

export default CommentsTable;