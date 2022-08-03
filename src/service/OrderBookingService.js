import axios from 'axios';

export const createOrder = async (data) => {
   return await axios.post(`https://tikap.cf:9931/api/v1/orderBookings`, data).then(res => {
    console.log(res.data)
    return res.data.message;
  }).catch(
    error => {
      console.log(error.response.data.message)
      return error.response.data.message;
    }
  );
  
}