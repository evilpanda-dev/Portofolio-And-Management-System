import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper
} from '@mui/material';
import { useContext } from 'react';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import './DataTable.css'

const DataTable = () =>{
    const {userProfile} = useContext(UserProfileContext);
    let data = [];
    // push user profile data to data array
    data.push(userProfile)
    return(
        <div className="dataTable">
<TableContainer component={Paper} >
<Table aria-label="simple table">
<TableHead>
<TableRow>
<TableCell>First Name :</TableCell>
<TableCell>Last Name :</TableCell>
<TableCell>Birth Date :</TableCell>
<TableCell>Address :</TableCell>
<TableCell>City :</TableCell>
<TableCell>Country :</TableCell>
<TableCell>Phone Number :</TableCell>
<TableCell>About me :</TableCell>
</TableRow>
</TableHead>
<TableBody>
{data.map((row) =>(
    <TableRow key={row.id} sx={{'&:last-child td, &:last-child th':{border:0}}}>
<TableCell>{row.firstName}</TableCell>
<TableCell>{row.lastName}</TableCell>
<TableCell>{row.birthDate}</TableCell>
<TableCell>{row.address}</TableCell>
<TableCell>{row.city}</TableCell>
<TableCell>{row.country}</TableCell>
<TableCell>{row.phoneNumber}</TableCell>
<TableCell>{row.aboutMe}</TableCell>
    </TableRow>
))}
    </TableBody>
    </Table>
    </TableContainer>
    </div>
    )
}

export default DataTable;