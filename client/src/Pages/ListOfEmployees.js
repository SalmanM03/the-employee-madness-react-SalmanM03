import React from 'react'
import { useState, useEffect } from 'react'
import TableOfEmployees from './TableOfEmployees'
import { useParams } from 'react-router-dom';

function ListOfEmployees() {
    const{years} = useParams();
    const[employeeData, setEmployeeData] = useState([]);

    async function getEmployeeData(){
        const fetchData = await fetch('/EmployeeData');
        const jsonData = await fetchData.json();
        setEmployeeData(jsonData);
    };

    

    async function yearsOfExperience(years){
        console.log(years)
        const fetchYears = await fetch(`/EmployeeData/${years}`)
        const JsonYears = await fetchYears.json()
        setEmployeeData(JsonYears)
    }


    async function sortByName(e){
        if(e.target.value === "DESC"){
            const fetchYears = await fetch(`/EmployeeData/sortByNameDESC/${e.target.value}`)
            const JsonYears = await fetchYears.json()
            setEmployeeData(JsonYears)
        } else if(e.target.value === "ASC"){
            const fetchYears = await fetch(`/EmployeeData/sortByNameASC/${e.target.value}`)
            const JsonYears = await fetchYears.json()
            setEmployeeData(JsonYears)
        }
      
    }

    useEffect(() => {
        yearsOfExperience(years)
        getEmployeeData()
    }, [])

  return <> 

            <select onChange={sortByName}>
                <option></option>
                <option>ASC</option>
                <option>DESC</option>
            </select>

            <TableOfEmployees
            employeeData={employeeData}
            />
    </>
}
export default ListOfEmployees
