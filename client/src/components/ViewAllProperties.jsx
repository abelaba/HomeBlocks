import { PropertyHandlingContext } from '../context/PropertyHandlingContext';
import { useState, useEffect, useContext } from 'react';
import PropertyCard from './PropertyCard';
export default function ViewAllProperties() {
  const { viewAllProperties } = useContext(PropertyHandlingContext);
  const [properties, setProperties] = useState([]);
  useEffect(async () => {
    setProperties(await viewAllProperties())
  }, []);

  return <div className={`grid grid-flow-col grid-rows-1  p-10 gap-4`}>
    {properties.length == 0 && <div className='m-20 p-20 text-white font bold' ><p> No properties at the moment </p></div>}
    {properties.map((property) => {
      if (property.available) {
        return (<>
          <PropertyCard property={property} />
        </>)
      }
    })}
  </div>
}

