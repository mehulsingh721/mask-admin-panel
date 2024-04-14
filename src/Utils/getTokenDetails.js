// Import Moralis
const Moralis = require("moralis");

// https://docs.moralis.io/web3-data-api/evm/reference/get-token-metadata?chain=bsc&addresses=[%220xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56%22]

const MoralisAPI =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjczZGIwNTNiLTM5MDgtNDUxZS04YzI4LTFlMDdmNzBmNTg2NyIsIm9yZ0lkIjoiMjc3MDc2IiwidXNlcklkIjoiMjgyNjU0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI2ZjUwYjZiZS02YjlhLTQ4ZWItOWMxYS1iOWYzZDIxZDA2MzMiLCJpYXQiOjE2ODkzMjkyMTEsImV4cCI6NDg0NTA4OTIxMX0.k5BIPaZ_Qfi-uMwSaXgTCb5Mu-R4o0I631bc_plOW8w";

// Initialize Moralis with your API key
async function initializeMoralis() {
  try {
    await Moralis.start({
      appId: MoralisAPI, // Replace with your Moralis Application ID
    });
    console.log("Moralis initialized successfully!");
    return true;
  } catch (error) {
    console.error("Error initializing Moralis:", error);
    return false;
  }
}

// Function to get token metadata

export const getERC20TokenMetadata = async () => {
  const isInitialized = await initializeMoralis();
  if (isInitialized) {
    const address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    const network = "bsc";
    try {
      const response = await Moralis.Web3API.token.getTokenMetadata({
        chain: network, // Use the network name (e.g., "bsc" for Binance Smart Chain)
        addresses: [address], // Pass an array of token addresses
      });

      console.log("Token Metadata:", response.result);
      return response.result;
    } catch (error) {
      console.error("Error fetching token metadata:", error);
    }
  } else {
    console.error("Moralis initialization failed. Exiting...");
  }
};
