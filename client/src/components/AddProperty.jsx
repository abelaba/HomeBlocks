import { useContext, useState } from "react"
import { AuthenticationContext } from "../context/AuthenticationContext";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import DecoratedButton from "../patterns/DecoratedButton";
import MapBox from "./MapBox";


export default function AddProperty() {

    const { addProperty } = useContext(PropertyHandlingContext);
    const { token } = useContext(AuthenticationContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [ownerShip, setOwnerShip] = useState("");
    return <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form class="w-full justify-center max-w-lg" method="POST">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Property Name
                    </label>
                    <input required onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Property Name" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Price
                    </label>
                    <input required type="number" onChange={(e) => setPrice(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Description
                    </label>
                    <textarea required onChange={(e) => setDescription(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Address
                    </label>
                    <input required onChange={(e) => setAddress(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                </div>

                <div class="w-full  px-3 py-2 mb-6 md:mb-0">
                    <label class="block tracking-wide flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Upload image</span>
                        <input onChange={(e) => setImage(e.target.files[0])} type='file' class="hidden" />
                    </label>
                </div>
                <div class="w-full  px-3 py-2 mb-6 md:mb-0">
                    <label class=" block tracking-wide flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg uppercase border border-blue cursor-pointer hover:bg-blue">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Upload Proof of Ownership</span>
                        <input onChange={(e) => setOwnerShip(e.target.files[0])} type='file' class="hidden" />
                    </label>
                </div>
                <div class="w-full px-3 py-2 mb-6 md:mb-0">
                    <DecoratedButton clickFunction={() => addProperty(name, description, address, image, price, ownerShip)} className={"w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"}>
                        Add
                    </DecoratedButton>
                </div>


            </div>
        </form>
        <MapBox />
    </div>
}