import React from 'react';
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => (

  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Years</th>  
        </tr>
        <tr>
        </tr>
          
      </thead>
      <tbody>
     
        
        {
        employees.map((employee) => {
          return(
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.level === "Junior" ? employee.years = 0 : employee.years}</td>

            <td>
                
                    <Link to={`/update/${employee._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => onDelete(employee._id)}>
                        Delete 
                    </button>
                </td>

          </tr>
          )
          })
        }
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
