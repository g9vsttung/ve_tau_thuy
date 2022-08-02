import axios from 'axios';

export const createOrder = async (data) => {
   return await axios.post(`https://localhost:5001/api/v1/orderBookings`, data).then(res => {
    return res.data.data;
  });
  
}