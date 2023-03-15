import { useEffect } from 'react'
import {useState} from 'react'


function CreateRobert() {
  
    const[robert, setRobert] = useState([])
  
    async function getRobert(){
        const fetchData = await fetch('/getRobert');
        const getFetchedData = await fetchData.json();
        console.log("Hallo World", getFetchedData)
        setRobert(getFetchedData);
    }

    useEffect(() => {
        getRobert();
    }, [])

    return (
        <div>
            {
                robert.map((element) =>{
                    return  <div key={element.name}>
                                {element.name}
                            </div>
                })
            }
        </div>
  )
}
export default CreateRobert
