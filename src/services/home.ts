import api from '../services/api';
import { HomeObj } from '../interfaces/interfaces';

export function  getHome(userId: string): Promise<HomeObj> {
  return new Promise(resolve => {        
    api.get("home?userId=" + userId)
    .then((response) => {
      const data = response.data as HomeObj;
      resolve({
        banners: data.banners,
        likedActivities: data.likedActivities
      }) 
    })
    .catch((err) => {
      console.error("Ops! ocorreu um erro" + err);
    });
  })     
}