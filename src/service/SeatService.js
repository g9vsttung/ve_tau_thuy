import axios from 'axios';

export const getAllSeat = async (onDate, onTime, routeId) => {
   return await axios.get(`https://tikap.cf:9931/api/v1/seats?OnDate=${onDate}&OnTime=${onTime}&RouteId=${routeId}`).then(res => {
    return res.data.data;
  });
  
}