import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.results[0].name}</td>
   <td>{props.record.results[0].title}</td>
   <td>{props.record.results[0].info.born}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() { 
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:3000/db/` || `https://carsoe2.eastus.cloudapp.azure.com/node/db`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 function deleteRecord(id) {
   fetch(`http://localhost:5000/db/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => {console.log(el._id); return el._id !== id;});
   setRecords(newRecords);
   recordList();
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
    if(record.results[0]) {
      //console.log(record.results);
      return (
        <Record
          record={record}
          deleteRecord={async () => await deleteRecord(record._id)}
          key={record._id}
        />
      );
    }    
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Famous People</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Title</th>
           <th>Born</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}