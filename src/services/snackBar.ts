import api from '../services/api';
import {
  DishOfDayProps,
  SnackBarItem,
  SnackBarItemsProps, 
  SnackBarProps,
} from '../interfaces/interfaces'

export function getDishOfDay() : Promise<DishOfDayProps>{
  return new Promise(resolve => {
    api.get('Cafeteria/GetDishOfDay')
    .then((response) => {
      const data = response.data as DishOfDayProps;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getCafeteria() : Promise<SnackBarProps> {
  return new Promise(resolve => {
    api.get('Cafeteria')
    .then((response) => {
      const data = response.data as SnackBarProps;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getUserFavoriteDishes(userId: string) {
  return new Promise(resolve => {
    api.get('Cafeteria/GetUserFavoriteDishes/' + userId)
    .then((response) => {
      const data = response.data;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getActiveDishesGroup() : Promise<SnackBarItemsProps[]> {
  return new Promise(resolve => {
    api.get('Cafeteria/GetActiveDishesGroup')
    .then((response) => {
      const data = response.data as SnackBarItemsProps[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}

export function getDish(id: string) : Promise<SnackBarItem> {
  return new Promise(resolve => {
    api.get('Cafeteria/GetDish/' + id)
    .then((response) => {
      const data = response.data as SnackBarItem;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
    });
  })
}
