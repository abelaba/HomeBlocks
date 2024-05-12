import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { PropertyHandlingContext } from '../../context/PropertyHandlingContext'
import { AuthenticationContext } from '../../context/AuthenticationContext'
import { decodeToken } from 'react-jwt'
import { ChatContext } from '../../context/ChatContext'
import { FaEthereum } from 'react-icons/fa'
import {
  MdChatBubbleOutline,
  MdLocationPin,
  MdOutlineBathroom,
  MdOutlineBedroomParent
} from 'react-icons/md'
import { BiHome, BiSolidArea } from 'react-icons/bi'
import moment from 'moment'
import './css/property_detail.css'
import React from 'react'
export default function PropertyDetail() {
  const { id } = useParams()

  const { viewProperty } = useContext(PropertyHandlingContext)
  const { token } = useContext(AuthenticationContext)
  const { createChat } = useContext(ChatContext)

  const [property, setProperty] = useState({})
  const [userId, setUserId] = useState('')

  useEffect(async () => {
    setProperty(await viewProperty(id))

    if (token()) {
      const userId = decodeToken(token())
      setUserId(userId._id)
    }
  }, [])

  return (
    <div>
      {property && (
        <div className='p-5 property'>
          {userId &&
            userId !== property.userId &&
            parseInt(property.tenant) == 0 && (
              <button
                onClick={() => createChat(property.userId, property._id)}
                className='chatButton'
              >
                <MdChatBubbleOutline size={30} />
              </button>
            )}
          <div className='w-full flex flex-row text-white p-4 grid grid-cols-2'>
            <div className='flex-auto rounded-b p-4 flex flex-col justify-between leading-normal'>
              <div className='mb-8'>
                <div className='border-b-1 border-black flex items-center justify-between'>
                  <div>
                    <div className=' font-normal font-bold text-4xl py-4'>
                      {property.name}
                    </div>
                    <div className=' font-normal text-xl pb-3 mb-2 ml-1'>
                      <MdLocationPin className='inline' /> {property.address}
                    </div>
                  </div>
                  <div style={{ margin: '10px', padding: '10px' }}>
                    <div className=' text-2xl flex flex-row gap-x-2 items-baseline'>
                      <p className='font-bold my-4'>
                        <FaEthereum className='p-0 inline' /> {property.price}{' '}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div className='text-xl mb-3 py-3'>
                    <div className='flex items-center gap-x-2'>
                      <p className=' text-2xl'>
                        {moment(property.timestamp).format('DD-MM-YYYY')}
                      </p>
                    </div>
                  </div>
                  <div className='text-xl my-4'>
                    <div className='grid grid-cols-4 gap-4'>
                      <div className='flex items-center gap-x-2'>
                        <BiHome size={30} className='' />
                        <p className=''>{property.propertyType}</p>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <MdOutlineBedroomParent size={30} className='' />
                        <p className=''>{property.numBedrooms} Bedrooms</p>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <MdOutlineBathroom size={30} className='' />
                        <p className=''>{property.numBathrooms} Bathrooms</p>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <BiSolidArea size={30} className='' />
                        <p className=''>{property.totalArea} sqft</p>
                      </div>
                    </div>
                  </div>
                  <div className='text-md my-4 rounded p-2'>
                    {property.description}
                  </div>
                </div>
              </div>
            </div>
            <div className='max-w-2xl'>
              <img
                className='rounded-lg'
                src={`${property.rentalImage}`}
                alt='House'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
