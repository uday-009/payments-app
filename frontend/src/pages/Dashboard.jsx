import React, { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Users } from "../components/Users";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const fetchBalance = async () => {
    const res = await axios.get(
      "http://localhost:5000/app/v1/account/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBalance(res.data.balance);
  };

  useEffect(() => {
    try {
      fetchBalance();
    } catch (error) {
      console.error("balance: ", error);
    }
  }, []);
  return (
    <div>
      <Appbar />
      {/* <Balance value={balance} /> */}
      <div className="flex p-8 gap-[20px]">
        

        <span class="  inline-flex flex-col justify-center items-center  max-w-250px] w-[250px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Balance in your account
          </p>
          <h1 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {balance}
          </h1>
        </span>

        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
