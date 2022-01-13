// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";

// import { contractABI, contractAddress } from "../utils/constants";

// export const TransactionContext = React.createContext();

// const { ethereum } = window;

// const createEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

//   return transactionsContract;
// };

// export const TransactionsProvider = ({ children }) => {
//   const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
//   const [transactions, setTransactions] = useState([]);

//   const handleChange = (e, name) => {
//     setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
//   };

//   const getAllTransactions = async () => {
//     try {
//       if (ethereum) {
//         const transactionsContract = createEthereumContract();

//         const availableTransactions = await transactionsContract.getAllTransactions();

//         const structuredTransactions = availableTransactions.map((transaction) => ({
//           addressTo: transaction.receiver,
//           addressFrom: transaction.sender,
//           timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
//           message: transaction.message,
//           keyword: transaction.keyword,
//           amount: parseInt(transaction.amount._hex) / (10 ** 18)
//         }));

//         console.log(structuredTransactions);

//         setTransactions(structuredTransactions);
//       } else {
//         console.log("Ethereum is not present");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkIfWalletIsConnect = async () => {
//     try {
//       if (!ethereum) return alert("Please install MetaMask.");

//       const accounts = await ethereum.request({ method: "eth_accounts" });

//       if (accounts.length) {
//         setCurrentAccount(accounts[0]);

//         getAllTransactions();
//       } else {
//         console.log("No accounts found");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkIfTransactionsExists = async () => {
//     try {
//       if (ethereum) {
//         const transactionsContract = createEthereumContract();
//         const currentTransactionCount = await transactionsContract.getTransactionCount();

//         window.localStorage.setItem("transactionCount", currentTransactionCount);
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!ethereum) return alert("Please install MetaMask.");

//       const accounts = await ethereum.request({ method: "eth_requestAccounts", });

//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

//   const sendTransaction = async () => {
//     try {
//       if (ethereum) {
//         const { addressTo, amount, keyword, message } = formData;
//         const transactionsContract = createEthereumContract();
//         const parsedAmount = ethers.utils.parseEther(amount);

//         await ethereum.request({
//           method: "eth_sendTransaction",
//           params: [{
//             from: currentAccount,
//             to: addressTo,
//             gas: "0x5208",
//             value: parsedAmount._hex,
//           }],
//         });

//         const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

//         setIsLoading(true);
//         console.log(`Loading - ${transactionHash.hash}`);
//         await transactionHash.wait();
//         console.log(`Success - ${transactionHash.hash}`);
//         setIsLoading(false);

//         const transactionsCount = await transactionsContract.getTransactionCount();

//         setTransactionCount(transactionsCount.toNumber());
//       } else {
//         console.log("No ethereum object");
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnect();
//     checkIfTransactionsExists();
//   }, [transactionCount]);

//   return (
//     <TransactionContext.Provider
//       value={{
//         transactionCount,
//         connectWallet,
//         transactions,
//         currentAccount,
//         isLoading,
//         sendTransaction,
//         handleChange,
//         formData,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract("0x2117E11D09643becDa6eF5F930E19E61A5890f3f", abi.abi, signer);
  // const balance = await provider.getBalance("0xbf8e8B1Cd3D34D80A14b4ffB4Ea6d2A2fa61862c");

  // const value = ethers.utils.formatEther( transaction.value )
  // await transactionContract.createTask("aa");
  // const task = await transactionContract.addProperty("userID",
  //   "Abel Avanue",
  //   "Cozy Home",
  //   "Addis Ababa",
  //   3);
  var properties = [];
  const count = await transactionContract.propertyCount();
  for (let i = 0; i < parseInt(count._hex); i++) {
    const property = await transactionContract.properties(i);

    const structuredProperty = {
      owner: property.owner,
      userId: property.userId,
      name: property.name,
      description: property.description,
      address: property.propertyAddress,
      price: parseInt(property.price._hex),
      propertyCount: parseInt(property.propertyCount._hex),
      propertyOwnershipHash: property.propertyOwnershipHash,
      available: property.available,
      timestamp: new Date(parseInt(property.timestamp._hex)).toLocaleString()
    }
    properties.push(structuredProperty);

  }


  console.log(
    properties
    // transaction
  );

  return transactionContract;

}

export const TransactionsProvider = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(sessionStorage.getItem('transactionCount'));
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));

  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No accounts");
      }

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum account");

    }
  }

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      const transactions = await transactionContract.getAllTransactions();
      console.log(transactions);
      localStorage.setItem("transactionCount", transactionCount);


    } catch (error) {
      console.log(error);

    }
  }

  // change account address when account is changed on MetaMask
  if (ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
      setConnectedAccount(accounts[0]);
    })
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, []);

  const connectWallet = async (e) => {
    try {
      e.preventDefault();
      if (!ethereum) return alert("Please connect metamask");
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum account");
    }

  }

  const sendTransaction = async () => {

    try {
      if (!ethereum) return alert("Please connect metamask");
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      const transactionContract = await getEthereumContract();
      console.log(transactionContract);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: connectedAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex
        }]
      });
      // console.log(request);

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Done`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());




    } catch (error) {
      console.log(error);
      throw new Error("No ethereum account");

    }
  }

  return (
    <TransactionContext.Provider value={{ connectedAccount, formData, sendTransaction, handleChange, checkIfTransactionsExist, getEthereumContract }}>
      {children}

    </TransactionContext.Provider>
  )

}
