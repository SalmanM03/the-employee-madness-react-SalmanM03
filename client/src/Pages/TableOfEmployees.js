import React from 'react'

function TableOfEmployees({employeeData}) {
  return (
    employeeData.map((element, index) => {
        return(
            <div key={index}>
                    {element.name},
                    {element.level},
                    {element.years}

            </div>
        )
    })
    )
}
export default TableOfEmployees
