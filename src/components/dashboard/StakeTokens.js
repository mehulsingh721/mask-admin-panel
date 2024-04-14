import { getPublicClient, getWalletClient } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { config } from "../../config";
import { STAKING_ABI } from "../../abi/staking.abi";
import { isAddress } from "viem";
import truncateEthAddress from "truncate-eth-address";
import axios from "axios";

const StakeTokens = () => {
  const GET_ALL_COIN_API = `${process.env.REACT_APP_API}/api/coins`;
  const GET_STAKING_COIN_API = `${process.env.REACT_APP_API}/api/staking/token`;
  const COIN_LIST_API = `${process.env.REACT_APP_API}/api/staking/token`;
  const TOKEN_TOGGLE_API = `${process.env.REACT_APP_API}/api/coins/staking/toggle`;

  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [allCoinTableData, setAllCoinTableData] = useState([]);
  const { address } = useAccount();
  const chain = ["ethereum", "binance-smart-chain", "tron", "polygon-pos"];

  const [isToggled, toggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const STAKING_CONTRACT = {
    mumbai: "0xfED487c6B10D2EA6CCE88635d9eC7f96E1C6e46a",
    "polygon-pos": "0x185E90eC79A0eDe15bFF646e9A93dEdB8E42eb4f",
    "binance-smart-chain": "0xd4b7363052Be3A5C0124FF0149e6cc51Bb200A27",
  };

  const callback = async (tokenId, active) => {
    await axios.post(TOKEN_TOGGLE_API, {
      tokenId: tokenId,
      active: active,
    });
    window.location.reload();
  };

  const emptyForm = {
    name: "",
    address: "",
    image:
      "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    chain: "",
    // decimal: "",
    tokenId: "",
    type: "",
    symbol: "",
    active: true,
    dailyPercent: "",
    minimumStake: "",
    minimumWithdraw: "",
  };

  const [showModal, setShowModal] = useState(false); // State to control modal display
  const [tokenInfo, setTokenInfo] = useState(emptyForm); // State to store token information
  const [stakeInfo, setStakeInfo] = useState({});
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  const fetchCoinData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data : ", data);
      setCoinData(data);
      setTableData(data); // Set tableData to the fetched coinData
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchAllCoinData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data : ", data);
      setAllCoinTableData(data); // Set tableData to the fetched coinData
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    setIsLoading(false);
  };

  const listCoin = async () => {
    let submit = true;
    if (!isAddress(tokenInfo.address)) {
      alert("Please enter the correct address");
      submit = false;
    } else if (
      tokenInfo.tokenIcon === "" ||
      tokenInfo.name === "" ||
      tokenInfo.symbol === "" ||
      tokenInfo.decimal === "" ||
      tokenInfo.type === ""
    ) {
      alert("Please enter all the details");
      submit = false;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: tokenInfo }),
    };

    try {
      const response = await fetch(COIN_LIST_API, requestOptions);
      console.log("response : ", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
      alert("Token listed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Token listing failed.");
    }
  };

  const handleTokenInfoChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setTokenInfo({
      ...tokenInfo,
      [name]: value,
    });
  };

  const handleListToken = async () => {
    await executeContract();
    console.log("Listing Token:", tokenInfo);
    setTokenInfo(emptyForm);
    setShowModal(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Copied: ${text}`);
      })
      .catch((err) => {
        console.error("Error:", err);
        console.error("Failed to copy: ", err);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = coinData.filter((data) =>
      Object.values(data).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    setTableData(filteredData);
  };

  useEffect(() => {
    // getERC20TokenMetadata();
    fetchCoinData(GET_STAKING_COIN_API);
    fetchAllCoinData(GET_ALL_COIN_API);
  }, [GET_ALL_COIN_API]);

  const executeContract = async () => {
    try {
      let execute = true;
      //   const contractAddress = STAKING_CONTRACT[tokenInfo.chain];
      //   console.log(address);

      //   try {
      //     await publicClient.simulateContract({
      //       address: contractAddress,
      //       abi: STAKING_ABI,
      //       functionName: "listToken",
      //       args: [
      //         tokenInfo.address,
      //         parseFloat(tokenInfo.minimumStake) *
      //           10 ** parseFloat(tokenInfo.decimal),
      //         parseFloat(tokenInfo.minimumWithdraw) *
      //           10 ** parseFloat(tokenInfo.decimal),
      //         parseFloat(tokenInfo.dailyPercent) * 100,
      //       ],
      //       account: address,
      //     });
      //   } catch (err) {
      //     console.log(JSON.stringify(err));
      //     alert(err.shortMessage);
      //     return;
      //   }
      //   // console.log(walletClient.add);
      //   await walletClient.writeContract({
      //     address: contractAddress,
      //     abi: STAKING_ABI,
      //     functionName: "listToken",
      //     args: [
      //       tokenInfo.address,
      //       parseFloat(tokenInfo.minimumStake) *
      //         parseFloat(10 ** tokenInfo.decimal),
      //       parseFloat(tokenInfo.minimumWithdraw) *
      //         parseFloat(10 ** tokenInfo.decimal),
      //       parseFloat(tokenInfo.dailyPercent) * 100,
      //     ],
      //     account: address,
      //   });
      await listCoin();
    } catch (err) {
      alert(err.metaMessages[0]);
    }
  };

  return (
    <div className="bg-center w-screen m-auto lg:pl-56 block p-4">
      <div className="max-w-7xl mx-auto flex justify-start items-start p-4 flex-col bg-white PageBG rounded-xl shadow-2xl">
        <div className="my-4 w-full text-center">
          <h1 className="sm:text-3xl text-2xl md:text-4xl font-bold text-gray-50">
            Stake Tokens Listing
          </h1>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-[400px]">
              <h2 className="text-xl font-semibold mb-4">List Token</h2>

              <div className="flex flex-col mb-4">
                <label htmlFor="chain">Select Network:</label>
                <select
                  id="chain"
                  name="chain"
                  value={tokenInfo.chain}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                >
                  <option value="">Select Network</option>
                  {chain.map((chain, index) => (
                    <option key={index} value={chain}>
                      {chain}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="tokenAddress">Token Address:</label>
                <input
                  type="text"
                  id="tokenAddress"
                  name="address"
                  value={tokenInfo.address}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="tokenImage">Token Icon:</label>
                <input
                  type="text"
                  id="tokenImage"
                  name="image"
                  value={tokenInfo.image}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Binance-Peg BUSD Token"
                  // disabled={true}
                  name="name"
                  value={tokenInfo.name}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="name">Min Stake:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Minimum stake amount"
                  // disabled={true}
                  name="minimumStake"
                  // value={tokenInfo.name}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="name">Minimum Withdraw:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Minimum Withdraw"
                  // disabled={true}
                  name="minimumWithdraw"
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="name">Daily Percent:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Daily Percent"
                  // disabled={true}
                  name="dailyPercent"
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="tokenSymbol">Symbol:</label>
                <input
                  type="text"
                  id="tokenSymbol"
                  placeholder="BUSD"
                  // disabled={true}
                  name="symbol"
                  value={tokenInfo.symbol}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="tokenDecimal">Decimal:</label>
                <input
                  type="number"
                  id="tokenDecimal"
                  placeholder="18"
                  // disabled={true}
                  name="decimal"
                  value={tokenInfo.decimal}
                  onChange={handleTokenInfoChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col mb-4">
                <h1>Token Type: </h1>

                <div className="flex items-center gap-10">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      id="NATIVE"
                      // disabled={true}
                      name="type"
                      value={"NATIVE"}
                      onChange={handleTokenInfoChange}
                      className="border rounded-md p-2"
                    />
                    <label htmlFor="NATIVE">Native</label>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      id="TOKEN"
                      // disabled={true}
                      name="type"
                      value={"TOKEN"}
                      onChange={handleTokenInfoChange}
                      className="border rounded-md p-2"
                    />
                    <label htmlFor="TOKEN">Token</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <h1>Listed on coingecko: </h1>

                <div className="flex items-center gap-10">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      id="YES"
                      // disabled={true}
                      name="tokenType"
                      value={"CUSTOM"}
                      onChange={handleTokenInfoChange}
                      className="border rounded-md p-2"
                    />
                    <label htmlFor="YES">Yes</label>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="radio"
                      id="NO"
                      // disabled={true}
                      name="tokenType"
                      value={""}
                      onChange={handleTokenInfoChange}
                      className="border rounded-md p-2"
                    />
                    <label htmlFor="NO">No</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleListToken}
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  List Token
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full px-5 text-center border rounded-xl overflow-x-auto bg-white">
          <div className="my-3">
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold">Search Coin/Token</h3>

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 ml-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
                style={{ maxWidth: "500px" }}
              />

              <button
                onClick={() => setShowModal(true)}
                className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-base text-xs py-2 px-4 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[200px]"
              >
                List New Token
              </button>
            </div>

            <table className="w-full">
              <thead className="text-md font-bold text-center">
                <tr>
                  <th className="bg-black/50 text-white py-3">S. No</th>
                  <th className="bg-black/50 text-white py-3">Name</th>
                  <th className="bg-black/50 text-white py-3">Address</th>
                  <th className="bg-black/50 text-white py-3">Symbol</th>
                  <th className="bg-black/50 text-white py-3">Decimal</th>
                  <th className="bg-black/50 text-white py-3">Network</th>
                  <th className="bg-black/50 text-white py-3">Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {tableData.map((data) => (
                  <tr key={data.id}>
                    <td className="py-3">{data.id}</td>
                    <td className="py-3">
                      <div className="flex flex-row justify-center">
                        <img
                          src={data.image}
                          alt="Token Image"
                          className="h-6 w-6"
                        />
                        <p className="ml-2">{data.name}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      {truncateEthAddress(data.address)}
                      {/* Missing */}
                      <span
                        className="ml-2 cursor-pointer"
                        onClick={() => copyToClipboard(data.address)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline-block"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11 3a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1zM7 7v10h6V7H7zm5 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </td>
                    <td className="py-3">{data.symbol}</td>
                    <td className="py-3">
                      {/* Missing */}
                      {data.decimal}
                    </td>
                    <td className="py-3">{data.chain}</td>
                    <td className="py-3">
                      <input
                        type="checkbox"
                        defaultChecked={data.active}
                        onClick={() => callback(data.id, !data.active)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeTokens;
