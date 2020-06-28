import { getAuthType,removeAuthType,addAuthType } from "./ActionType";

export const getAuthCreator = () => {
  return {
    type: getAuthType,
  }
}

export const addAuthCreator = (body) => {
  return {
    type: addAuthType,
    value: body,
  }
}

export const removeAuthCreator = () => {
  return {
    type: removeAuthType,
  }
}