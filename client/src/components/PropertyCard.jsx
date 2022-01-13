import React from 'react';
import { Link } from 'react-router-dom';
import { PORT } from '../utils/constants';
import { shortenAddress } from '../utils/shortenAddress';
export default function PropertyCard ({property}){
    console.log(`https://localhost:${PORT}property.rentalImage`);
    const address = "https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-on-bright-sunny-day-with-green-grass-picture-id1223022367?s=2048x2048"
    return (
        <div className='max-w-md'>
            <Link to={`/property/${property.propertyCount}`}>
                <div class=" rounded overflow-hidden shadow-lg bg-indigo-500 hover:bg-violet-400">
                <img class="w-full" src={`http://localhost:${PORT}/${property.rentalImage}`} alt="House"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl text-white mb-2">{property.name}</div>
                    <p class="text-white text-base">
                        {property.description}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{property.timestamp}</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{shortenAddress(property.owner)}</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{property.address}</span>
                </div>
                </div>
            </Link>
        </div>
    )
}