import { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import DecoratedButton from "../patterns/DecoratedButton";

export default function AddProperty() {
  const { addProperty } = useContext(PropertyHandlingContext);
  const { token } = useContext(AuthenticationContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [ownerShip, setOwnerShip] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBathrooms, setNumBathrooms] = useState(0);
  const [totalArea, setTotalArea] = useState(0);

  const handleCoordinatesChange = (lat, lng) => {
    setCoordinates({ lat, lng });
  };

  const handleSubmit = (e) => {
    // Call addProperty function here with all the form values
    addProperty(
      name,
      description,
      address,
      coordinates,
      image,
      price,
      ownerShip,
      propertyType,
      numBedrooms,
      numBathrooms,
      totalArea
    );
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form className="w-full max-w-lg" method="POST">
        <div className="flex flex-wrap  mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {/* Property Name */}
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Property Name
            </label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Property Name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            {/* Price */}
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Price
            </label>
            <input
              required
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full px-3">
            {/* Description */}
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Description
            </label>
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap  mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            {/* Address */}
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Address
            </label>
            <input
              required
              onChange={(e) => setAddress(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Albuquerque"
            />
          </div>
          <div className="w-full px-3 mt-5 mb-6 md:mb-0">
            {/* Coordinates */}
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-coordinates"
            >
              Coordinates (Latitude, Longitude)
            </label>
            <input
              required
              onChange={(e) => {
                const [lat, lng] = e.target.value.split(",");
                handleCoordinatesChange(parseFloat(lat), parseFloat(lng));
              }}
              className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-coordinates"
              type="text"
              placeholder="Latitude, Longitude"
            />
          </div>
          <div className="flex flex-wrap -mx-1 mt-4 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              {/* Property Type */}
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="property-type"
              >
                Property Type
              </label>
              <input
                required
                onChange={(e) => setPropertyType(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="property-type"
                type="text"
                placeholder="Apartment, House, etc."
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              {/* Number of Bedrooms */}
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="num-bedrooms"
              >
                Number of Bedrooms
              </label>
              <input
                required
                type="number"
                onChange={(e) => setNumBedrooms(parseInt(e.target.value))}
                className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="num-bedrooms"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-1 mt-4 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              {/* Number of Bathrooms */}
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="num-bathrooms"
              >
                Number of Bathrooms
              </label>
              <input
                required
                type="number"
                onChange={(e) => setNumBathrooms(parseInt(e.target.value))}
                className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="num-bathrooms"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              {/* Total Area */}
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="total-area"
              >
                Total Area (sqft)
              </label>
              <input
                required
                type="number"
                onChange={(e) => setTotalArea(parseInt(e.target.value))}
                className="appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="total-area"
              />
            </div>
          </div>
        </div>
        <div className="w-full py-2 mb-6 md:mb-0">
          
            <div className="mt-4 mb-4">
              <img
                src={image? URL.createObjectURL(image): "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"}
                alt="Uploaded"
                className="max-h-96 w-full"
              />
            </div>
          
          {/* Upload image */}
          <label className="block tracking-wide flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Upload image</span>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="w-full py-2 mb-6 md:mb-0">
          {/* Upload Proof of Ownership */}
          <label className="block tracking-wide flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">
              Upload Proof of Ownership
            </span>
            <input
              onChange={(e) => setOwnerShip(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="w-full py-2 mb-6 md:mb-0">
          {/* DecoratedButton */}
          <DecoratedButton
            clickFunction={handleSubmit}
            className={
              "w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            }
          >
            Add
          </DecoratedButton>
        </div>
      </form>
    </div>
  );
}
