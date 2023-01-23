import api from "./api";
import { ExamsProps, ExamNeedActivityProps } from "../interfaces/interfaces";

export function getMedicalExam() : Promise<ExamsProps[]> {
  return new Promise(resolve => {
    api.get(`/Activitys/GetMedicalExam`)
      .then(response => {
        const data = response.data as ExamsProps[];
        resolve(data);
      })
      .catch(error => {
        console.log(error);
      });
  })
}

export function getActivityNeedExam() : Promise<ExamNeedActivityProps[]> {
  return new Promise(resolve => {
    api.get(`/Activitys/GetActivityNeedExam`)
      .then(response => {
        const data = response.data as ExamNeedActivityProps[];
        resolve(data);
      })
      .catch(error => {
        console.log(error);
      })
  })
}

export function addMedicalExam(UserId: string, ActivitId: string, MedicalExam: any) {
  const data = {
    UserId,
    ActivitId,
    MedicalExam
  }

  return new Promise(resolve => {
    console.log(data)
    api.post(`/Activitys/AddMedicalExam`, data)
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        console.log(error);
      })
  })
}
