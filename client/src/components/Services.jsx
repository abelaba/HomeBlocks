import React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { RiHeart2Fill } from 'react-icons/ri'

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className='flex flex-row white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl justify-center items-center'>
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1 flex-row'>
      <h3 className='mt-2 text-white text-lg'>{title}</h3>
      <p className='mt-1 text-white text-sm'>{subtitle}</p>
    </div>
  </div>
)

const Services = () => (
  <div className='flex w-full justify-center items-center'>
    <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
      <div className='flex-1 flex flex-col justify-start items-start'>
        <h1 className='text-white text-3xl sm:text-5xl py-2'>
          Services that we
          <br />
          continue to improve
        </h1>
        <p className='text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base'>
          The best choice for renting your homes, with the various super
          friendly services we offer
        </p>
      </div>

      <div className='flex-1 flex flex-col justify-start items-center'>
        <ServiceCard
          color='bg-[#2952E3]'
          title='Smart Property Listings'
          icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
          subtitle='Seamlessly display rental properties with a user-friendly interface. Landlords can effortlessly create listings, while tenants find their perfect home with ease.'
        />
        <ServiceCard
          color='bg-[#F84550]'
          title='Easy Tenant Applications'
          icon={<RiHeart2Fill fontSize={21} className='text-white' />}
          subtitle='Simplify the rental process. Tenants can swiftly create profiles, submit applications, and communicate directly with landlords. Landlords benefit from streamlined applicant management.'
        />
      </div>
    </div>
  </div>
)

export default Services
