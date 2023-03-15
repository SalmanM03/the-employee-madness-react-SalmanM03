import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import "./Employee.css";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  console.log(data)

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
async function filterByLevel(e){
  const getData = await fetch(`/filterByLevel/${e.target.value}`);
  const getFetchedData = await getData.json() 
  setData(getFetchedData)
}

async function filterByPosition(e){
  const fetchData = await fetch(`/filterByPosition/${e.target.value}`);
  const getFetchedData = await fetchData.json();
  console.log("Hallo World", fetchData )
  setData(getFetchedData)
}

async function filterByName(e){
  const name = await fetch(`/filterByName/${e.target.value}`)
  const getName = await name.json();
  setData(getName)
}

async function handleClick(e){
  if(e.target.value === "Name"){
    const fetchData = await fetch(`/sortByName/${e.target.value}`);
    const getFetchedData = await fetchData.json()
    setData(getFetchedData)
  }
  else if(e.target.value === "Position"){
    const fetchData = await fetch(`/sortByPosition/${e.target.value}`);
    const getFetchedData = await fetchData.json()
    setData(getFetchedData)
  }
  else if(e.target.value === "Level"){
    const fetchData = await fetch(`/sortByLevel/${e.target.value}`);
    const getFetchedData = await fetchData.json()
    setData(getFetchedData)
  }
}



  useEffect(() => {
    setFetch();
  
  }, []);

  if (loading) {
    return <Loading />;
  }
  return<>
  <input type="text" placeholder="search for Level" onChange={filterByLevel}></input>
  <input type="text" placeholder="search for Position" onChange={filterByPosition}></input>
  <input type="text" placeholder="search for Name" onChange={filterByName}></input>


  <select onChange={handleClick}>
      <option></option>
      <option>Name</option>
      <option>Level</option>
      <option>Position</option> 
  </select>


  <EmployeeTable employees={data} onDelete={handleDelete} />;
  </>

};

export default EmployeeList
