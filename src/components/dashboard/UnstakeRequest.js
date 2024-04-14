import React, { useEffect, useState } from "react";
import data from "./data";
import StakeTable from "./StakeTable"; // Import your StakeTable component
import CreateLoading from "../../Loading/createLoading";

const UnstakeRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stakeData, setStakeData] = useState([]);

  const GET_UNSTAKE_REQ_API = `${process.env.REACT_APP_API}/api/staking/requests`;

  const fetchStakingData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data : ", data);
      setStakeData(data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStakingData(GET_UNSTAKE_REQ_API);
  }, []);

  if (isLoading) {
    return <CreateLoading />;
  }

  return (
    <div className="bg-center w-screen m-auto  lg:pl-56 block   p-4">
      <div className=" max-w-7xl mx-auto    flex justify-start items-start p-4 flex-col  bg-white PageBG rounded-xl shadow-2xl ">
        <div className="my-4 w-full text-center">
          <h1 className="sm:text-3xl text-2xl  md:text-4xl font-bold text-gray-50">
            Unstake Requests
          </h1>
        </div>

        <StakeTable stakeData={stakeData} />
      </div>
    </div>
  );
};

export default UnstakeRequest;
