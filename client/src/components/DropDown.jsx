import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { shortenAddress } from '../utils/shortenAddress'

export default function DropDown({logOut,account}) {
  return (
    <div className="text-right">
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-32 justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {shortenAddress(account)}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={logOut}
                    className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaSignOutAlt
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaSignOutAlt
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Sign Out
                  </button>
                )}
              </Menu.Item>
              
            </div>
            
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
