import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEquipment = (employee) => {
  return fetch(`/api/equipment/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEquipment(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEquipment(employee)
      .then(() => {
        navigate("/api/equipment");         // Maybe cause for unfuncitonality
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EquipmentUpdater;
