import { Outlet, Link } from "react-router-dom";
// import { useState } from "react";
import "./Layout.css";
// import EmployeeTable from "../Components/EmployeeTable";

const Layout = () => {
  // const [data, setData] = useState(null);
  return(
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
          <Link to="/equipment">
          <button type="button">Go to Equipments</button>
          </Link>
          <Link to ="/createEquipment">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
)};


export default Layout;
