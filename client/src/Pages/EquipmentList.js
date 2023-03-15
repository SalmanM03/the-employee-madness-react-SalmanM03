import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import "./Employee.css";
import EquipmentTable from "./EquipmentTable";
import { Link } from "react-router-dom";

const fetchEmployees = (signal) => {
  return fetch("/api/equipment", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  //  function updateEmployee(employee){
  //   setData(employee);
  // }
function setFetch(){
  const controller = new AbortController();

  fetchEmployees(controller.signal)
    .then((employees) => {
      setLoading(false);
      setData(employees);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        setData(null);
        throw error;
      }
    });

  return () => controller.abort();
}

  useEffect(() => {
    setFetch();
  
  }, []);

  if (loading) {
    return <Loading />;
  }
  return<>
  <div>
    <Link to="/CreateEquipment">
        <button>Create Equipment</button>
    </Link>
  </div>
  <EquipmentTable employees={data} onDelete={handleDelete} />;

  </>

};

export default EquipmentList
