import PropertyCard from './PropertyCard';
import AddPropertyCard from './AddPropertyCard';
import { PropertyHandlingContext } from '../context/PropertyHandlingContext';
import { useState,useEffect,useContext } from 'react';
export default function ManageProperties (){

    const {viewMyProperties} = useContext(PropertyHandlingContext);
    const[myProperties,setMyProperties] = useState([]);
    useEffect(async () => {
        setMyProperties(await viewMyProperties())
        
      }, []);
    console.log(myProperties);

    return <div className={`grid grid-flow-col grid-rows-1  p-10 gap-4`}>
            <AddPropertyCard/> 
            {myProperties.map((property)=>{
                return <PropertyCard property={property}/>
            })}
          </div>
}