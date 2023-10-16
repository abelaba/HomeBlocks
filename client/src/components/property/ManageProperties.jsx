import { PropertyHandlingContext } from "../../context/PropertyHandlingContext";
import { useState, useEffect, useContext } from "react";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { BsFillHouseAddFill } from "react-icons/bs";

export default function ManageProperties() {
  const { viewMyProperties } = useContext(PropertyHandlingContext);
  const [properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    maxPrice: Number.MAX_SAFE_INTEGER,
    minBedrooms: 0,
    minBathrooms: 0,
    propertyType: "",
    address: "",
    minTotalArea: 0,
  });
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  useEffect(async () => {
    const allProperties = await viewMyProperties();
    setProperties(allProperties);
  }, []);

  const toggleFilter = () => {
    // setFilterCollapsed(!filterCollapsed);
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.price <= searchFilters.maxPrice &&
      property.numBedrooms >= searchFilters.minBedrooms &&
      property.numBathrooms >= searchFilters.minBathrooms &&
      (searchFilters.propertyType === "" ||
        property.propertyType === searchFilters.propertyType) &&
      property.address
        .toLowerCase()
        .includes(searchFilters.address.toLowerCase()) &&
      property.totalArea >= searchFilters.minTotalArea
    );
  });

  return (
    <div className="p-6  flex flex-col justify-items-center items-center">
      {!filterCollapsed && (
        <div className="grid grid-flow-cols grid-cols-8 mb-4 gap-4">
          <div className="grid grid-flow-rows">
            <label htmlFor="maxPrice" className="text-white">
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              placeholder="Max Price"
              value={searchFilters.maxPrice}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  maxPrice: +e.target.value,
                })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div className="grid grid-flow-rows">
            <label htmlFor="minBedrooms" className="text-white">
              Min Bedrooms
            </label>
            <input
              id="minBedrooms"
              type="number"
              placeholder="Min Bedrooms"
              value={searchFilters.minBedrooms}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  minBedrooms: +e.target.value,
                })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div className="grid grid-flow-rows">
            <label htmlFor="minBathrooms" className="text-white">
              Min Bathrooms
            </label>
            <input
              id="minBathrooms"
              type="number"
              placeholder="Min Bathrooms"
              value={searchFilters.minBathrooms}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  minBathrooms: +e.target.value,
                })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div className="grid grid-flow-rows">
            <label htmlFor="propertyType" className="text-white">
              Property Type
            </label>
            <input
              id="propertyType"
              type="text"
              placeholder="Property Type"
              value={searchFilters.propertyType}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  propertyType: e.target.value,
                })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div className="grid grid-flow-rows">
            <label htmlFor="address" className="text-white">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={searchFilters.address}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, address: e.target.value })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div className="grid grid-flow-rows">
            <label htmlFor="minTotalArea" className="text-white">
              Min Total Area
            </label>
            <input
              id="minTotalArea"
              type="number"
              placeholder="Min Total Area"
              value={searchFilters.minTotalArea}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  minTotalArea: +e.target.value,
                })
              }
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm w-36"
            />
          </div>
          <div>
            <div
              onClick={toggleFilter}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Search
            </div>
          </div>
          <Link to="/addProperty">
            <div className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none">
              <div className="grid items-center justify-center">
                <div className="text-white">
                  <BsFillHouseAddFill size={20} className="inline" /> Add
                  property
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full m-20 p-20 text-white font-bold">
            <p>No properties match the filters</p>
          </div>
        ) : (
          filteredProperties.map((property) => {
            if (property.available) {
              return <PropertyCard key={property.id} property={property} />;
            }
          })
        )}
      </div>
    </div>
  );
}
