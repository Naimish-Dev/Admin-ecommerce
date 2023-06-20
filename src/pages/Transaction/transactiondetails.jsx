import "../Order/orderdetail.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useState } from "react";

export default function Transactiondetails() {
  const [transaction, settransaction] = useState({});
  const [userdata, setuserdata] = useState({});

  const { transactionid } = useParams();
  const backendrequest = userRequest();
  
  const fetchseling = async () => {
    try {
      const responce = await backendrequest.get(`transaction/find/${transactionid}`);
      responce.status === 200 && settransaction(responce.data);
      responce.status === 200 && setuserdata(responce.data.userid);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchseling();
  }, []);
  
  console.log(transaction);

  return (
    <div className="product1">
        <h2 className="ordersheading"> Transaction </h2>
      <div className="productTop1">
        <div className="productTopRight1">
          <h3>User </h3>

          <div className="productInfoTop1">
            <img
              src={transaction && userdata.img}
              alt="profile"
              className="productInfoImg"
            />
            <span className="productName">
              {transaction && userdata.userName}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem2">
              <span className="productInfoKey">Contact : </span>
              <span className="productInfoValue">
                {transaction && userdata.number}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">Email : </span>
              <span className="productInfoValue">
                {transaction && userdata.email}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">id : </span>
              <span className="productInfoValue">
                {transaction && userdata._id}
              </span>
            </div>
          </div>
        </div>

        <div className="productTopRight2 ">
          <h3> Transaction </h3>
          <div className="productInfoBottom">
            <div className="productInfoItem2">
              <span className="productInfoKey">Transaction Id : </span>
              <span className="productInfoValue">
                {transaction && transaction.tid}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">card no. : </span>
              <span className="productInfoValue">
                {transaction && transaction.card}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">amount : </span>
              <span className="productInfoValue">
                {transaction && transaction.amount}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">status : </span>
              <span className="productInfoValue">
                {transaction && transaction.status}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">Date : </span>
              <span className="productInfoValue">
                {transaction && transaction.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
