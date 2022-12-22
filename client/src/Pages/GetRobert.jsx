import { useState } from "react"
import { useEffect } from "react"

const GetRobert = () => {

    const [robert, setRobert] = useState([])


    useEffect(()=> {
         const fetchData = async() => {
            const data = await(
                await fetch("http://localhost:8080/robert")
            ).json()
            setRobert(data)
        }
        fetchData()
    }, [])

    return(
        <div>
            {
            robert.map((element) => {
                return <div key={element._id}>
                            {element.name} 
                        </div>
            })
            } 
        </div>
         
    ) 
}
export default GetRobert
