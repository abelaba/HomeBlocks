import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PropertyHandlingContext } from "../../context/PropertyHandlingContext";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { PORT, baseURL } from "../../utils/constants";
import { decodeToken } from "react-jwt";
import { ChatContext } from "../../context/ChatContext";
import { FaEthereum } from "react-icons/fa";
import {
  MdLocationPin,
  MdOutlineBathroom,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { BiHome, BiSolidArea } from "react-icons/bi";
import moment from "moment";

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
        <div className="p-5">
          <div className="w-full flex flex-row home-detail p-4 rounded-t-md grid grid-cols-2 items-center">
            <div className="flex-auto rounded-b p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="border-b-1 border-black flex items-center justify-between">
                  <div>
                    <div className=" font-normal font-bold text-4xl py-4">
                      {property.name}
                    </div>
                    <div className=" font-normal text-xl pb-3 mb-2 ml-1">
                      <MdLocationPin className="inline" /> {property.address}
                    </div>
                  </div>
                  <div style={{ margin: "10px", padding: "10px" }}>
                    {userId && userId !== property.userId && (
                      <button
                        onClick={() =>
                          createChat(property.userId, property.propertyCount)
                        }
                        style={{
                          backgroundColor: "#4CAF50" /* Green */,
                          border: "none",
                          color: "white",
                          padding: "15px 32px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          margin: "4px 2px",
                          transitionDuration: "0.4s",
                          cursor: "pointer",
                          borderRadius: "12px",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#45a049")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#4CAF50")
                        }
                      >
                        Talk with owner
                      </button>
                    )}
                    <div className=" text-2xl flex flex-row gap-x-2 items-baseline">
                      <p className="font-bold my-4">
                        <FaEthereum className="p-0 inline" /> {property.price}{" "}
                        ETH per month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-xl mb-3 py-3">
                    <div className="flex items-center gap-x-2">
                      <p className="text-gray-800 text-2xl">
                        {moment(property.timestamp).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl my-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex items-center gap-x-2">
                        <BiHome size={30} className="text-gray-600" />
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
                  <div className="text-md my-4 rounded p-2">
                    {property.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-2xl">
              <img
                className="rounded-lg"
                src={`${baseURL}/${property.rentalImage}`}
                alt="House"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
