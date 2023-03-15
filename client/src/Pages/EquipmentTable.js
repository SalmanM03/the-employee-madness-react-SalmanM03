import React from 'react'
import { Link } from 'react-router-dom'

const EquipmentTable = ({employees, onDelete}) =>(
    <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
        </tr>
        <tr>
        </tr>
          
      </thead>
        <tbody>
            {employees.map((element) => (
                <tr key={element._id}>
                   <td>{element.name}</td> 
                   <td>{element.level}</td>
                   <td>{element.position}</td>
                <td>
                    <Link to={`/updateEquipment/${element._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => onDelete(element._id)}>
                        Delete 
                    </button>
                </td>

                </tr>

                
            ))
            }
        </tbody>
        </table>
        </div>
)
export default EquipmentTable
