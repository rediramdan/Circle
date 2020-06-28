import {
  addUsersType,
  getAllUsersType,
  getOneUserType,
  editUsersType,
} from '../actions/ActionType';

const initialValue = {
  list: [],
  one: {},
};

const users = (prevState = initialValue, action) => {
  switch (action.type) {
    case getOneUserType:
      const newData = prevState.list.filter(
        (response) => response.uid === action.value,
      );
      return {
        ...prevState,
        one: newData,
      };
    case getAllUsersType:
      return {
        ...prevState,
      };
    case addUsersType:
      return {
        ...prevState,
        list: action.value,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default users;
