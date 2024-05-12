import { useContext, useState } from 'react'
import { PropertyHandlingContext } from '../../context/PropertyHandlingContext'
import DecoratedButton from '../../shared-components/DecoratedButton'
import React from 'react'

export default function AddProperty() {
  const { addProperty } = useContext(PropertyHandlingContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [ownerShip, setOwnerShip] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [numBedrooms, setNumBedrooms] = useState(0)
  const [numBathrooms, setNumBathrooms] = useState(0)
  const [totalArea, setTotalArea] = useState(0)

  const handleCoordinatesChange = (lat, lng) => {
    setCoordinates({ lat, lng })
  }

  const handleSubmit = () => {
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
    )
  }

  return (
    <div className='min-h-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center'>
      <form className='flex flex-row gap-10' method='POST'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row'>
            <TextInput
              label='Property Name'
              placeholder='Property Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              placeholder={'Price'}
              label='Price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <CoordinatesInput
            label='Coordinates (Latitude, Longitude)'
            placeholder='Latitude, Longitude'
            value={coordinates}
            onChange={handleCoordinatesChange}
          />
          <div className='flex flex-row'>
            <TextInput
              label='Address'
              placeholder='Albuquerque'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextInput
              label='Property Type'
              placeholder='Apartment, House, etc.'
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
          </div>

          <div className='flex flex-row'>
            <NumberInput
              label='Number of Bedrooms'
              value={numBedrooms}
              onChange={(value) => setNumBedrooms(value)}
            />
            <NumberInput
              label='Number of Bathrooms'
              value={numBathrooms}
              onChange={(value) => setNumBathrooms(value)}
            />
            <NumberInput
              label='Total Area (sqft)'
              value={totalArea}
              onChange={(value) => setTotalArea(value)}
            />
          </div>
          <TextAreaInput
            label='Description'
            placeholder="Make it as long and as crazy as you'd like"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <ImageUploader
            label='Upload image'
            value={image}
            onChange={(file) => setImage(file)}
          />
          <FileUploader
            label='Upload Proof of Ownership'
            value={ownerShip}
            onChange={(file) => setOwnerShip(file)}
          />
          <DecoratedButton
            clickFunction={handleSubmit}
            className='w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 border-b-4 border-green-700 hover:border-green-500 rounded-md shadow-lg'
          >
            Rent Now
          </DecoratedButton>
        </div>
      </form>
    </div>
  )
}

function TextInput({ label, placeholder, value, onChange }) {
  return (
    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
      <label
        className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
        htmlFor={label.toLowerCase().replace(' ', '-')}
      >
        {label}
      </label>
      <input
        required
        onChange={onChange}
        value={value}
        className='appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        id={label.toLowerCase().replace(' ', '-')}
        type='text'
        placeholder={placeholder}
      />
    </div>
  )
}

function TextAreaInput({ label, placeholder, value, onChange }) {
  return (
    <div className='w-full px-3'>
      <label
        className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
        htmlFor={label.toLowerCase().replace(' ', '-')}
      >
        {label}
      </label>
      <textarea
        required
        onChange={onChange}
        value={value}
        className='appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-32 w-32'
        id={label.toLowerCase().replace(' ', '-')}
        placeholder={placeholder}
      />
      <p className='text-gray-600 text-xs italic'>
        Make it as long and as crazy as you would like
      </p>
    </div>
  )
}

function CoordinatesInput({ label, value, onChange }) {
  // Function to handle changes in latitude input
  const handleLatChange = (e) => {
    onChange(parseFloat(e.target.value), value.lng)
  }

  // Function to handle changes in longitude input
  const handleLngChange = (e) => {
    onChange(value.lat, parseFloat(e.target.value))
  }

  return (
    <div className='w-full px-3 mt-5 mb-6 md:mb-0'>
      <label
        className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
        htmlFor={label.toLowerCase().replace(' ', '-')}
      >
        {label}
      </label>
      <div className='flex space-x-2'>
        <input
          required
          onChange={handleLatChange}
          value={value.lat}
          className='appearance-none block w-1/2 bg-gray-200 text-black border border-gray-200 
            rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          type='number'
          step='any'
          placeholder='Latitude'
        />
        <input
          required
          onChange={handleLngChange}
          value={value.lng}
          className='appearance-none block w-1/2 bg-gray-200 text-black border border-gray-200 
            rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          type='number'
          step='any'
          placeholder='Longitude'
        />
      </div>
    </div>
  )
}

function ImageUploader({ label, value, onChange }) {
  return (
    <div className='w-full py-2 mb-6 md:mb-0'>
      {/* Image Preview */}
      <div className='mt-4 mb-4'>
        <img
          src={
            value
              ? URL.createObjectURL(value)
              : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
          }
          alt='Uploaded'
          className='max-h-64 w-full  rounded'
        />
      </div>

      {/* Upload image */}
      <label className='block tracking-wide flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue'>
        <svg
          className='w-8 h-8'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
        </svg>
        <span className='mt-2 text-base leading-normal'>{label}</span>
        <input
          onChange={(e) => onChange(e.target.files[0])}
          type='file'
          className='hidden'
        />
      </label>
    </div>
  )
}

function FileUploader({ label, onChange }) {
  return (
    <div className='w-full py-2 mb-6 md:mb-0'>
      <label className='block tracking-wide flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue'>
        <svg
          className='w-8 h-8'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
        </svg>
        <span className='mt-2 text-base leading-normal'>{label}</span>
        <input
          onChange={(e) => onChange(e.target.files[0])}
          type='file'
          className='hidden'
        />
      </label>
    </div>
  )
}

function NumberInput({ label, value, onChange }) {
  return (
    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
      <label
        className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
        htmlFor={label.toLowerCase().replace(' ', '-')}
      >
        {label}
      </label>
      <input
        required
        type='number'
        onChange={(e) => onChange(parseInt(e.target.value))}
        value={value}
        className='appearance-none block w-full bg-gray-200 text-black border 
          border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        id={label.toLowerCase().replace(' ', '-')}
      />
    </div>
  )
}
