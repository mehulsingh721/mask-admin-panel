import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillGift } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
// import data from "./data";
import CreateLoading from "../../Loading/createLoading";
import StakeTable from "./StakeTable";
const NotificationModal = ({ isOpen, onClose, notifications }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            <div className="flex items-center justify-start space-x-4">
              <div className="bg-gray-200 rounded-full p-2">
                {/* Add appropriate icons based on your preference */}
                {/* Example: */}
                {index % 2 === 0 ? (
                  <IoIosNotifications className="text-blue-500 text-2xl" />
                ) : (
                  <IoIosNotifications className="text-red-500 text-2xl" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-gray-600">{notification.content}</p>
              </div>
            </div>
            {index !== notifications.length - 1 && (
              <hr className="my-4 border-gray-300" />
            )}
          </div>
        ))}
        <button
          className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-base text-xs py-2 px-4 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-[100px] mt-5"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const GET_UNSTAKE_REQ_API = `${process.env.REACT_APP_API}/api/staking/requests`;

  // Initialize stakeData as an empty array
  const [stakeData, setStakeData] = useState([]);

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [notifications] = useState([
    {
      id: 1,
      title: "Notification 1",
      content: "This is the content of Notification 1",
    },
    {
      id: 2,
      title: "Notification 2",
      content: "This is the content of Notification 2",
    },
    {
      id: 3,
      title: "Notification 3",
      content: "This is the content of Notification 3",
    },
    {
      id: 4,
      title: "Notification 4",
      content: "This is the content of Notification 4",
    },
    {
      id: 5,
      title: "Notification 5",
      content: "This is the content of Notification 5",
    },
  ]);

  useEffect(() => {
    fetchStakingData(GET_UNSTAKE_REQ_API);
  }, []);

  if (isLoading) {
    return <CreateLoading />;
  }

  return (
    <>
      <div className="bg-center w-screen m-auto lg:pl-56 block p-4">
        {/* Account Summary section */}
        <div className="max-w-7xl mx-auto flex justify-start items-start p-4 flex-col bg-white PageBG rounded-xl shadow-2xl">
          {/* Header with notification icon */}
          <div className="flex flex-row items-center justify-between">
            <div className="relative" onClick={openModal}>
              <IoIosNotifications className="text-white text-3xl cursor-pointer" />
              {notifications.length > 0 && (
                <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-1 text-xs">
                  {notifications.length}
                </span>
              )}
            </div>
            <h1 className="text-indigo-800 text-xl font-medium m-3">
              Account Summary
            </h1>
          </div>
          <div className="grid w-full gap-5 mx-auto   grid-cols-1  sm:grid-cols-2 md:grid-cols-3     rounded-xl  my-4  ">
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Account Balance</div>
                <div className="text-gray-800 text-lg">$5.00</div>
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <FaSackDollar />
              </div>
            </div>
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Profits</div>
                <div className="text-gray-800 text-lg">$0.00</div>
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <FaCoins />
              </div>
            </div>
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Bonus</div>
                <div className="text-gray-800 text-lg">$0.00</div>
              </div>
              <div className="font-bold text-2xl p-4 rounded-full text-white Iconbg">
                <AiFillGift />
              </div>
            </div>

            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Deposit</div>
                <div className="text-gray-800 text-lg">$0.00</div>
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowDownCircleFill />
              </div>
            </div>
            <div className="flex justify-between items-center p-7  bg-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-start items-start flex-col ">
                <div className="text-gray-400 text-sm">Total Withdrawal</div>
                <div className="text-gray-800 text-lg">$0.00</div>
              </div>
              <div className="font-bold text-3xl p-3 rounded-full text-white Iconbg">
                <RiArrowUpCircleFill />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-indigo-800 text-xl font-medium my-3">
              Unstake Pending Requests
            </h1>
          </div>

          <StakeTable stakeData={stakeData} />
        </div>
      </div>
      <NotificationModal
        isOpen={showModal}
        onClose={closeModal}
        notifications={notifications}
      />
    </>
  );
}

export default Home;
