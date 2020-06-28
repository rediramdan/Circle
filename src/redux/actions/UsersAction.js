import { addUsersType,getOneUserType,getAllUsersType } from "./ActionType";

export const getAllUsersCreator = () => {
  return {
    type: getAllUsersType,
  }
}

export const addUsersCreator = (body) => {
  return {
    type: addUsersType,
    value: body,
  }
}

export const getOneUserCreator = (value) => {
  return {
    type: getOneUserType,
    value: value,
  }
}