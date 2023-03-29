import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { PORT } from "../utils/constants";
import { decodeToken } from "react-jwt";
import { ChatContext } from "../context/ChatContext";
import { FaEthereum } from "react-icons/fa";
import {
  MdOutlineBathroom,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { BiHome, BiSolidArea } from "react-icons/bi";

export default function PropertyDetail() {
  const { id } = useParams();

  const { viewProperty } = useContext(PropertyHandlingContext);
  const { token } = useContext(AuthenticationContext);
  const { createChat } = useContext(ChatContext);

  const [property, setProperty] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    setProperty(await viewProperty(id));

    if (token) {
      const userId = decodeToken(token);
      setUserId(userId._id);
    }
  }, []);

  return (
    <div>
      {property && (
        <div className="p-10">
          <div className="w-full flex flex-row bg-white p-5 rounded-t-md grid grid-cols-2 ">
            <div className="flex-auto rounded-b p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="border-b-2 flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 font-normal font-bold text-4xl">
                      {property.name}
                    </div>
                    <div className="text-gray-900 font-normal text-xl pb-3 mb-2 ml-1">
                      {property.address}
                    </div>
                  </div>
                  <div>
                    {userId && userId !== property.userId && (
                      <button
                        onClick={() =>
                          createChat(property.userId, property.propertyCount)
                        }
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 hover:border-blue-500 rounded-lg"
                      >
                        Talk with owner
                      </button>
                    )}
                  </div>
                </div>

                <div className="pl-3">
                  <div className="text-gray-900 text-2xl flex flex-row gap-x-2 items-baseline">
                    <p className="font-bold my-4">
                      {property.price} ETH <FaEthereum className="p-0 inline" />{" "}
                      /month
                    </p>
                  </div>
                  <div className="text-gray-900 text-xl mb-3">
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold text-gray-600">Listed:</p>
                      <p className="text-gray-800">
                        {new Date(property.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-900 text-xl my-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="flex items-center gap-x-2 mb-3">
                        <p className="font-semibold text-gray-600">
                          <BiHome />{" "}
                        </p>
                        <p className="text-gray-800">{property.propertyType}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <MdOutlineBedroomParent
                          size={30}
                          className="text-gray-600"
                        />
                        <p className="text-gray-800">
                          {property.numBedrooms} Bedrooms
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <MdOutlineBathroom
                          size={30}
                          className="text-gray-600"
                        />
                        <p className="text-gray-800">
                          {property.numBathrooms} Bathrooms
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <BiSolidArea size={30} className="text-gray-600" />
                        <p className="text-gray-800">
                          {property.totalArea} sqft
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-900 text-md mb-2 border-2 rounded p-2">
                    {property.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-2xl ">
              <img
                className="rounded-lg"
                src={`http://localhost:${PORT}/${property.rentalImage}`}
                alt="House"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
