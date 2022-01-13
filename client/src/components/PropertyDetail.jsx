import { useParams } from "react-router-dom";
import {useContext,useEffect,useState} from "react";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { PORT,SECRET } from "../utils/constants";
import {decodeToken } from "react-jwt";
import { ChatContext } from "../context/ChatContext";
import { FaEthereum } from "react-icons/fa";


export default function PropertyDetail(){
    const{id} = useParams();

    const {viewProperty} = useContext(PropertyHandlingContext);
    const {token} = useContext(AuthenticationContext);
    const {createChat} = useContext(ChatContext);

    const[property,setProperty] = useState("");
    const[userId,setUserId] = useState("");

    useEffect(async () => {
      setProperty(await viewProperty(id));
      if(token){
        const userId = decodeToken(token);
        setUserId(userId._id);
      }
      }, []);
    console.log(property);
    console.log(id);
    return <>
    {property && 
        <div>
              <div class="p-10">
                  <div class=" w-full flex flex-row">
                    <div className="max-w-2xl"> <img src={`http://localhost:${PORT}/${property.rentalImage}`} /> </div>
                    <div class="flex-auto bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
                      <div class="mb-8">
                        <div class="text-gray-900 font-normal text-4xl pb-3 border-b-2 mb-2">House Listing</div>
                        <div class="text-gray-900 font-bold text-xl mb-2">{property.name}</div>
                        <div class="text-gray-900 text-md mb-2">Address: {property.address}</div>
                        <div class="text-gray-900 text-md mb-2 border-2 rounded p-10">{property.description}</div>
                        <div class="text-gray-900 text-2xl flex flex-row gap-x-2 items-baseline"> <p>Price:</p> <p>{property.price} ETH</p> <FaEthereum className="p-0"/> </div>
                        <div class="text-gray-900 text-xl flex flex-row gap-x-2 items-baseline"> <p>Owner:</p> <p>{property.owner}</p> </div>
                        <div class="text-gray-900 text-xl flex flex-row gap-x-2 items-baseline"> <p>Date Listed:</p> <p>{property.timestamp}</p> </div>
                      </div>
                      <div class="flex items-center">
                      {userId && userId!=property.userId && <button onClick={()=>createChat(property.userId, property.propertyCount)} class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 hover:border-blue-500 rounded-lg">
                        Talk with owner
                        </button>}
                      </div>
                    </div>
                  </div>
              </div>
      </div>
  }
    </>
}
