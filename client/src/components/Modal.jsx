import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import { shortenAddress } from "../utils/shortenAddress";
export default function Modal({message}) {
    const [showModal, setShowModal] = React.useState(false);
    const{getTransactionHistory} =  useContext(PropertyHandlingContext);
    const [transactionHistory, setTransactionHistory] = useState("");
    return (
      <>
        
            <div class="chat-message">
                <div class="flex items-end justify-center">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <button onClick={async()=>{setShowModal(true);setTransactionHistory(await getTransactionHistory(message.message));}}>
                        <span class="px-4 py-2 rounded-lg inline-block  bg-green-500 text-white">
                          <p>{`Payment Completed ${ shortenAddress(message.message)}`}</p>
                          <p>{`Date: ${message.time.split("T")[0]}`}</p> 
                        </span>
                      </button>
                    </div>
                </div>
            </div>
          
        
        {showModal ? transactionHistory && (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Transaction History
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      BlockHash: {transactionHistory.hash}
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      BlockNumber: {transactionHistory.blockNumber}
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      ChainId: {transactionHistory.chainId}
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      From: {transactionHistory.from}
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      To: {transactionHistory.to}
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Paid: {ethers.utils.formatEther( transactionHistory.value )} ETH
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }