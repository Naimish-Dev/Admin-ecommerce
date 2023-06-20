import axios from "axios";

// const URL = "http://localhost:5000/api/";
const URL = "https://ecommerce-backend-production-4ddd.up.railway.app/api/";


export const publicRequest = axios.create({
  baseURL: URL,
});

export const userRequest = ()=>{
  const userdatat = localStorage.getItem("User");

if (userdatat) {
  const t = userdatat && JSON.parse(userdatat);
  var TOKEN = t.accesstoken;
}
  return axios.create({
    baseURL: URL,
    headers: { token: `Bearer ${TOKEN}` },
  });

}
