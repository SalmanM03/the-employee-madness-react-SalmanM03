import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";
import "./Employee.css";

const fetchEquipment = (signal) => {
  return fetch("/api/equipment", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
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

  fetchEquipment(controller.signal)
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
async function handleClickLevel(e){
    if(e.target.value.length <= 2){
      setFetch();
      return
    }  
    const level = await(
    await fetch(`http://localhost:8080/api/level/${e.target.value}`)
    ).json()
      setData(level);
}

async function handleClickPosition(e){
  if(e.target.value.length <= 2){
    setFetch();
    return
  }
const position = await(
  await fetch(`http://localhost:8080/api/position/${e.target.value}`)
).json()
setData(position)
}
async function orderBy(e){

 
  if(e.target.value === "Name"){
    const orderLevel = await (await fetch(`/api/sort/${e.target.value}`)
    ).json();
    setData(orderLevel)
    console.log(orderLevel)
  }
 
  else if(e.target.value === "Level"){
    const orderName = await (await fetch(`/api/sort/${e.target.value}`)
    ).json();
    setData(orderName)
  }
  else if(e.target.value === "Position"){
    const orderPosition = await (await fetch(`/api/sort/${e.target.value}`)
    ).json();
    setData(orderPosition)
  }
}

  useEffect(() => {
    setFetch();
  
  }, []);

  if (loading) {
    return <Loading />;
  }
  return<>
     <div className="flexbox-container">
        <input placeholder="sarch for level" onChange={handleClickLevel} className="inputfield"></input>
        <input placeholder="sarch for position" onChange={handleClickPosition} className="inputfield"></input>
    </div>
    <select onChange={orderBy}>
        <option> </option>
        <option>Name</option>
        <option >Level</option>
        <option >Position</option>        
      </select>
  <EquipmentTable equipments={data} onDelete={handleDelete} />
  </>

};

export default EmployeeList
