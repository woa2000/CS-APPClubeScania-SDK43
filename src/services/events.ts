import api from '../services/api'
import {
  Event, FormProps, ModelResult, PaymentModelResult
} from '../interfaces/interfaces'

export function getActiveEvents() : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/GetActiveEvents')
    .then((response) => {
      const data = response.data as Event[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getEvent(id: string) : Promise<Event> {
  return new Promise(resolve => {
    api.get('Events/GetEvent/' + id)
    .then((response) => {
      const data = response.data as Event;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getLastEvents() : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/GetLastEvents')
    .then((response) => {
      const data = response.data as Event[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getEventsByUserId(userId: string) : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/byUserId/' + userId)
    .then((response) => {
      const data = response.data as Event[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function createReservation(formData: FormProps) : Promise<PaymentModelResult> {
  return new Promise(resolve => {
    api.post('Events/CreateReservation', formData)
    .then((response) => {
      const data = response.data as PaymentModelResult;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}