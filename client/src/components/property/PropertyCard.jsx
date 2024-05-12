import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationPin } from 'react-icons/md'
import moment from 'moment'
import './css/property_card.css'
import { FaEthereum } from 'react-icons/fa'

export default function PropertyCard({ property }) {
  return (
    <div className='w-96'>
      <Link to={`/property/${property._id}`}>
        <div className='rounded-lg overflow-hidden shadow-lg p-2 text-white propertyCard'>
          <img
            className='h-64 w-full rounded-lg'
            src={`${property.rentalImage}`}
            alt='House'
          />
          <div className='px-2 pt-3'>
            <div className='font-bold text-2xl'>
              <FaEthereum className='p-0 inline' size={30} /> {property.price}
            </div>
          </div>
          <div className='px-2 py-2 border-b-2'>
            <p className='text-base'>
              <MdLocationPin className='inline' /> {property.address}
            </p>
          </div>
          <div className='px-2 pt-4 pb-2'>
            <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              {moment(property.date).format('DD-MM-YYYY')}
            </span>
            <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              Bedrooms: {property.numBedrooms}
            </span>
            <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              Bathrooms: {property.numBathrooms}
            </span>
            <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              Area: {property.totalArea} sqft
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
