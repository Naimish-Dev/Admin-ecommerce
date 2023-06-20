import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect} from "react"
import { useState } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useMemo } from "react";
export default function Home() {
const [activeuser,setactiveuser] = useState([])
const month = useMemo(()=>[
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
],[])
const request = userRequest()
useEffect(() => {
  const fetchactiveuser = async () => {
    try {
      const res = await request.get("users/state");
      res.data.map((val) =>
        setactiveuser((preval) => [
          ...preval,
          { name: month[val._id - 1], "Active User": val.total },
        ])
      );
    } catch (e) {
      console.log(e);
    }
  };

  fetchactiveuser();
}, [ ]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={activeuser}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
