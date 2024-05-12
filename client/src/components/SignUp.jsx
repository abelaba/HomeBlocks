import { PropertyHandlingContext } from '../context/PropertyHandlingContext'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext'
import React from 'react'

export default function SignUp() {
  const { connectedAccount } = useContext(PropertyHandlingContext)
  const { register } = useContext(AuthenticationContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            Sign up for an account
          </h2>
        </div>
        <form className='mt-8 space-y-6' action='#' method='POST'>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='ethAccount' className='sr-only'>
                Ethereum Account
              </label>
              <input
                value={connectedAccount}
                disabled
                id='ethAccount'
                name='ethAccount'
                type='text'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base'
                placeholder='No ethereum account'
              />
            </div>
            <div>
              <label htmlFor='full-name' className='sr-only'>
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id='full-name'
                name='fullname'
                type='text'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base'
                placeholder='Full Name'
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id='email-address'
                name='email'
                type='email'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                name='password'
                type='password'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base'
                placeholder='Password'
              />
            </div>
          </div>

          <div>
            <button
              disabled={!connectedAccount}
              onClick={(e) => {
                register(e, name, email, password, connectedAccount)
              }}
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
