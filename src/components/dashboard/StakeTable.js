// StakeTable.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TokenNameMap = {
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "ETH",
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const ROI = {
  0: "0 %",
  1: "2 %",
  2: "5 %",
  3: "10 %",
  4: "25 %",
};

const convertEpochToDateTime = (epoch) => {
  const date = new Date(epoch * 1000); // Convert seconds to milliseconds
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const truncateString = (inputString) => {
  try {
    const startPart = inputString.substring(0, 4);
    const endPart = inputString.substring(inputString.length - 4);
    return `${startPart}...${endPart}`;
  } catch (e) {
    return "0x00...0000";
    console.log(e);
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(`Copied: ${text}`);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const StakeTable = ({ stakeData }) => {
  const location = useLocation(); // Get current URL location
  const isStakeHistoryPage =
    location.pathname === "/dashboard/home" ||
    location.pathname === "/dashboard/unstake-request";

  const isPrevUnstakeHistory =
    location.pathname === "/dashboard/prev-unstake-history";

  const processStake = async (id, status) => {
    try {
      const params = new URLSearchParams({
        stakingId: id,
        status: status,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API}/api/staking/update-request?${params}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert(`Stake id ${id} successfully ${status}`);

      const data = await response.json();
      console.log("data : ", data);
    } catch (error) {
      alert(`Stake id ${id} unable to ${status}`);
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full px-5 text-center border rounded-xl overflow-x-auto bg-white">
      <div className="my-3 w-[1200px]">
        <table>
          <thead className="text-md font-bold w-full text-center">
            <tr>
              <th className="bg-black/50 text-white py-3 w-40">Stake Id</th>
              <th className="bg-black/50 text-white py-3 w-40">User Wallet</th>
              {/* <th className="bg-black/50 text-white py-3 w-40">User Id</th> */}
              <th className="bg-black/50 text-white py-3 w-40">Duration</th>
              <th className="bg-black/50 text-white py-3 w-40">Stake</th>
              <th className="bg-black/50 text-white py-3 w-40">ROI</th>
              <th className="bg-black/50 text-white py-3 w-60">Staked Time</th>
              <th className="bg-black/50 text-white py-3 w-60">
                Maturity Time
              </th>
              {(isStakeHistoryPage || isPrevUnstakeHistory) && (
                <th className="bg-black/50 text-white py-3 w-60">Process</th>
              )}
            </tr>
          </thead>
          <tbody className="w-full text-center">
            {stakeData.length === 0 ? (
              <tr>
                <td colSpan={isStakeHistoryPage ? 8 : 6}>
                  <p className="text-center">No Data </p>
                </td>
              </tr>
            ) : (
              stakeData.map((data) => (
                <tr key={data.id}>
                  <td className="py-1 hover:bg-black/20 w-40">{data.id}</td>
                  {/* <td className="py-1 hover:bg-black/20 w-40">Missing</td> */}
                  <td className="py-1 hover:bg-black/20 w-40">
                    {truncateString(data.userAddress)}

                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => copyToClipboard(data.userWallet)}
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
                  <td className="py-1 hover:bg-black/20 w-40">
                    {data.duration}
                  </td>
                  <td className="py-1 hover:bg-black/20 w-40">
                    {data.amount} {TokenNameMap[data.tokenAddress]}
                  </td>
                  <td className="py-1 hover:bg-black/20 w-40">
                    {ROI[data.stakingIndex]}
                  </td>
                  <td className="py-1 hover:bg-black/20 w-60">
                    {convertEpochToDateTime(data.startDate)}
                  </td>
                  <td className="py-1 hover:bg-black/20 w-60">
                    {convertEpochToDateTime(data.endDate)}
                  </td>
                  {isStakeHistoryPage && ( // Render the last column only on stake-history page
                    <td className="py-1 0 w-60 space-x-2">
                      <button
                        className="p-2 px-3 rounded-lg bg-red-500 text-white"
                        onClick={() => {
                          processStake(data.id, "APPROVED");
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="p-2 px-3 rounded-lg bg-green-500 text-white"
                        onClick={() => {
                          processStake(data.id, "REJECT");
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  )}

                  {isPrevUnstakeHistory &&
                    (data.status === "APPROVED" ? (
                      <td className="py-1 text-green-500 w-60">
                        {toTitleCase(data.status)}
                      </td>
                    ) : (
                      <td className="py-1 text-red-500 w-60">
                        {toTitleCase(data.status)}
                      </td>
                    ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StakeTable;
