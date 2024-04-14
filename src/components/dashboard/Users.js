import React, { useState } from "react";

const Users = () => {
  const initialData = [
    {
      id: 1,
      username: "rahulcse022",
      userWallet: "0x2A34....A3590",
      introducerUsername: "sunny009",
      introducerWallet: "0x2A34....A3590",
    },
    {
      id: 2,
      username: "john_doe",
      userWallet: "0x4B67....C7913",
      introducerUsername: "jane_smith",
      introducerWallet: "0x8D91....E1234",
    },
    {
      id: 3,
      username: "alice123",
      userWallet: "0x1F23....B5678",
      introducerUsername: "bob456",
      introducerWallet: "0x5G67....H9101",
    },
    {
      id: 4,
      username: "user_xyz",
      userWallet: "0x9K12....L3456",
      introducerUsername: "user_abc",
      introducerWallet: "0x3M78....N9101",
    },
    {
      id: 5,
      username: "test_user",
      userWallet: "0x7O23....P5678",
      introducerUsername: "another_user",
      introducerWallet: "0x6Q12....R9101",
    },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = initialData.filter((data) =>
      Object.values(data).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    setTableData(filteredData);
  };

  return (
    <div className="bg-center w-screen m-auto lg:pl-56 block p-4">
      <div className="max-w-7xl mx-auto flex justify-start items-start p-4 flex-col bg-white PageBG rounded-xl shadow-2xl">
        <div className="my-4 w-full text-center">
          <h1 className="sm:text-3xl text-2xl md:text-4xl font-bold text-gray-50">
            Users Details
          </h1>
        </div>

        <div className="w-full px-5 text-center border rounded-xl overflow-x-auto bg-white">
          <div className="my-3">
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold">Search items</h3>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 ml-4 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
                style={{ maxWidth: "500px" }}
              />
            </div>

            <table className="w-full">
              <thead className="text-md font-bold text-center">
                <tr>
                  <th className="bg-black/50 text-white py-3">S. No</th>
                  <th className="bg-black/50 text-white py-3">Username</th>
                  <th className="bg-black/50 text-white py-3">
                    User Wallet Address
                  </th>
                  <th className="bg-black/50 text-white py-3">
                    Introducer Username
                  </th>
                  <th className="bg-black/50 text-white py-3">
                    Introducer Wallet Address
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                {tableData.map((data) => (
                  <tr key={data.id}>
                    <td className="py-3">{data.id}</td>
                    <td className="py-3">{data.username}</td>
                    <td className="py-3">
                      {data.userWallet}
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
                    <td className="py-3">{data.introducerUsername}</td>
                    <td className="py-3">
                      {data.introducerWallet}
                      <span
                        className="ml-2 cursor-pointer"
                        onClick={() => copyToClipboard(data.introducerWallet)}
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

export default Users;
