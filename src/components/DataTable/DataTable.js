import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper
} from '@mui/material';
import { useEffect,useState } from 'react';
import './DataTable.css'

let dataKeys = {};

const DataTable = props =>{
    const {
        profileData,
    } = props
   const [data] = useState([]);


    useEffect(()=>{
        if(profileData instanceof Promise){
            profileData.then((response) => {
               for (var attr in response) {
                   if (response.hasOwnProperty(attr)) dataKeys[attr] = (response[attr]);
                   if(attr === 'birthDate'){
                          dataKeys[attr] = (response[attr].split('T')[0]);
                   }
               }
           })
           data.push(dataKeys)
       } else {
           data.push(profileData)
       }
    },[])
    
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