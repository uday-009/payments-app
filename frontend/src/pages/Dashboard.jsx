import React, { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Users } from "../components/Users";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');
  const fetchBalance = async () => {
    const res = await axios.get("http://localhost:5000/app/v1/account/balance",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setBalance(res.data.balance);
  };

  useEffect(() => {
    try {
      fetchBalance()
    } catch (error) {
      console.error('balance: ', error)
    }
  }, []);
  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
