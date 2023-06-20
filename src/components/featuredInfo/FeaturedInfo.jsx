import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useState } from "react";
export default function FeaturedInfo() {
  const [revanue,setrevanue]=useState([{}])
  const [persentag,setpersentag]=useState({rp:0,op:0,})
  const [order, setorder] = useState([{}]);

// const 

const fetchrevanueone=async()=>{
  const request = userRequest();
  try {
    const res = await request.get("/orders/income");
    setrevanue(res.data);
    
    let rp= 0
 res.data.length >= 2 ? rp  = ((res.data[1].total*100) / res.data[0].total) : rp = 100 ;
setpersentag((pre)=>{return {...pre, rp}})
  } catch (e) {
    console.log(e);
  }
}
const fetchrevanuetwo=async()=>{
  const request = userRequest();
  try {
    const res = await request.get("/orders/totalorder");
    setorder(res.data);
   let op = 0
     res.data.length >= 2 ? op = ((res.data[1].orders * 100) /  res.data[0].orders) : op = 100;
   setpersentag((pre) => {
     return { ...pre, op };
   });
  } catch (e) {
    console.log(e);
  }
}
useEffect(()=>{
  fetchrevanueone()
  fetchrevanuetwo();
  },[])
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {revanue[1] ? revanue[1].total : revanue[0].total}
          </span>

          <span className="featuredMoneyRate">
            {Math.floor(persentag.rp)} %
            {revanue && persentag.rp < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {order[1] ? order[1].orders : order[0].orders}
          </span>
          <span className="featuredMoneyRate">
            {Math.floor(persentag.op)} %
            {order && persentag.op < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
