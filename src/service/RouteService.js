import axios from 'axios';

export const getAllService = async () => {
   return await axios.get(`https://tikap.cf:9931/api/v1/routes`).then(res => {
    return res.data.data;
  });
  
}