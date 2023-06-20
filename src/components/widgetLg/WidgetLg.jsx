import { useState } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import "./widgetLg.css";
import {useEffect} from "react"
import { format } from "timeago.js";

export default function WidgetLg() {

const [orders,setorders]=useState([]);
const request = userRequest();
const fetchdata = async () => {
  try {
    const responce = await request.get("/orders/latesttransition");
    setorders(responce.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(()=>{
  fetchdata()
},[])


  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>

        <tr className="widgetLgTr stickytr">
          <th className="widgetLgTh">Customer id</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        </thead>
        <tbody>

       { orders?.map((val,index)=>{
        return (
          <tr key={index} className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{val.userid}</span>
            </td>
            <td className="widgetLgDate">{format(val.createdAt)}</td>
            <td className="widgetLgAmount">{val.cartdata[0].amount}</td>
            <td className="widgetLgStatus">
              <button className={"widgetLgButton " + val.cartdata[0].status}>
                {val.cartdata[0].status}
              </button>
            </td>
          </tr>
        );
      })}
      </tbody>

      
      </table>
    </div>
  );
}
