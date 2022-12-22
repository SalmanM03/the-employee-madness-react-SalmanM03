import { Link } from "react-router-dom";
import "./EquipmentTable.css"

const EquipmentTable = ({ equipments, onDelete }) => (

  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Amount</th>
        </tr>
          
      </thead>
      <tbody>
      {equipments.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.level}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
                Delete
              </button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
