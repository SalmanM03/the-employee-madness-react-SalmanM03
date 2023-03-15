import React from 'react'
import { useState } from 'react'
import EquipmentForm from './EquipmentForm'
import { useNavigate } from "react-router-dom"


const equipmentCreator = (equipment) => {
    return fetch("/api/equipment", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
    }).then((res) => res.json());
};


const CreateEquipment =() => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const handleCreateEmployee = (equipment) => {
        setLoading(true);
    
        equipmentCreator(equipment)
          .then(() => {
            navigate("/equipment");
          })
          .catch((err) => {
            throw err;
          })
          .finally(() => {
            setLoading(false);
          });
      };
      
  return (
            <EquipmentForm
             onCancel={() => navigate("/")}
             disabled={loading}
             onSave={handleCreateEmployee}
            />
        )
        
  
}
export default CreateEquipment
