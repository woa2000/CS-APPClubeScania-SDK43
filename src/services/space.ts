import api from "./api";
import { ModelResult, SpaceSchedule } from '../interfaces/interfaces'

export function getScheduledUserSpace(userId: string): Promise<SpaceSchedule[]> {
  return new Promise(resolve => { 
    api.get("Schedules/GetScheduledUserSpace?userId=" + userId)
    .then((response) => {    
      const data = response.data as SpaceSchedule[];
      resolve(data) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getRecordUserSchedulesSpace(userId: string): Promise<SpaceSchedule[]> {
  return new Promise(resolve => { 
    api.get("Schedules/GetRecordUserSchedulesSpace?userId=" + userId)
    .then((response) => {   
      const data = response.data as SpaceSchedule[];
      resolve(data) 

    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}


export function cancelBookingSpace(id: string): Promise<ModelResult> {    
  return new Promise(resolve => {   
    api.delete("Schedules/Remove/" + id)
    .then((response) => {
      const data = response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    })
  })
}