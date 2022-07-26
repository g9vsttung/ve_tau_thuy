import axios from 'axios';

export const getAllService = async () => {
   return await axios.get(`https://localhost:5001/api/v1/routes`).then(res => {
    return res.data.data;
  });
  
}