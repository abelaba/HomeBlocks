import React from "react";
import { Link } from "react-router-dom";
import { PORT } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";
import { MdLocationPin } from "react-icons/md";

export default function PropertyCard({ property }) {

  return (
    <div className="w-96">
      <Link to={`/property/${property.propertyCount}`}>
        <div className="rounded overflow-hidden shadow-lg bg-white hover:bg-violet-400 text-black">
          <img
            className="w-full"
            src={`http://localhost:${PORT}/${property.rentalImage}`}
            alt="House"
          />
          <div className="px-6 pt-4 ">
            <div className="font-bold text-xl mb-2">
              <span className="text-black-400 mr-1">{property.price}</span>ETH /
              month
            </div>
          </div>
          <div className="px-6 py-2 border-b-2 mx-2">
            <div className="font-bold text-xl mb-2">{property.name}</div>
            <p className="text-base">
              <MdLocationPin className="inline" /> {property.address}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {property.timestamp}
            </span>
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {shortenAddress(property.owner)}
            </span>

            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Bedrooms: {property.numBedrooms}
            </span>
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Bathrooms: {property.numBathrooms}
            </span>
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Area: {property.totalArea} sqft
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
