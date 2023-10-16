import propertyContract from "./abi/propertyContract.json";

const {
  VITE_MAP_BOX_API,
  VITE_BASE_URL,
  VITE_PORT,
  VITE_SECRET,
  VITE_PROPERTY_CONTRACT_ADDRESS,
} = import.meta.env;

export const propertyContractAddress = VITE_PROPERTY_CONTRACT_ADDRESS;
export const propertyContractABI = propertyContract.abi;
export const PORT = VITE_PORT;
export const SECRET = VITE_SECRET;
export const mapBoxAPI = VITE_MAP_BOX_API;

export const baseURL = VITE_BASE_URL;

// Auth
export const registerURL = `${baseURL}/api/user/register`;
export const loginURL = `${baseURL}/api/user/login`;

// Chat
export const chatURL = `${baseURL}/api/chat`;

// Renting
export const rentingURL = `${baseURL}/api/rental`;
