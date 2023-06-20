
import {
  getStorage,
  ref,
  deleteObject,
} from "firebase/storage";
import firebaseapp from "./Firebase";



const deleteimg = (imglink,path) => {
   
    const arr = imglink.split("F");
    const deleteproduct =arr[1].split("?", 1);
    
    const imgpath = path ? path : 'Products_img'; 
  const storage = getStorage(firebaseapp);
  const desertRef = ref(storage, `${imgpath}/${deleteproduct}`);
  deleteObject(desertRef)
    .then(() => {
      console.log("sucess");
    })
    .catch((error) => {
      console.log(error);
    });
};


export default deleteimg;