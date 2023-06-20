import Chart from "../../components/chart/Chart";
import "./analytics.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect } from "react";
import { useState } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useMemo } from "react";
export default function Analytics() {
    const [transaction, settransaction] = useState([]);
    const [user, setuser] = useState([]);
    const [order, setorder] = useState([]);
  const month = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const request = userRequest();
  const fetchactiveuser = async () => {
      try {
        const res = await request.get("users/state");
        res.data.map((val) =>
          setuser((preval) => [
            ...preval,
            { name: month[val._id - 1], "Active User": val.total },
          ])
        );
      } catch (e) {
        console.log(e);
    }
    };
    
  const fetchorder = async () => {
      try {
        const res = await request.get("orders/state");
        res.data.map((val) =>
          setorder((preval) => [
            ...preval,
            { name: month[val._id - 1], Orders: val.Orders },
          ])
        );
      } catch (e) {
        console.log(e);
    }
    };
  const fetchtransaction = async () => {
      try {
        const res = await request.get("transaction/state");
        res.data.map((val) =>
          settransaction((preval) => [
            ...preval,
            { name: month[val._id - 1], Amount: val.Amount },
          ])
        );
      } catch (e) {
        console.log(e);
    }
    };
    
    useEffect(() => {
    fetchactiveuser();
    fetchorder();
    fetchtransaction()
  },[]);


  console.log(transaction);
  return (
    <div className="home">
      <div className="order">
        <h2> User </h2>
        <Chart data={user} title="User Analytics" grid dataKey="Active User" />
      </div>
      <div className="order">
        <h2> Order </h2>
        <Chart data={order} title="Order Analytics" grid dataKey="Orders" />
      </div>
     
      <div className="order">
        <h2> Transaction </h2>

        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <BarChart
            width={500}
            height={300}
            data={transaction}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey="name" />
            <YAxis dataKey="Amount" />
            <Tooltip />
            <Legend />

            <Bar dataKey="Amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
