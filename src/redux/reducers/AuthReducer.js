import {getAuthType, removeAuthType, addAuthType} from '../actions/ActionType';

const initialValue = {
  profile: {},
};

const auth = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAuthType:
      return {
        ...prevState,
      };
    case removeAuthType:
      return {
        ...prevState,
        profile: {},
      };
    case addAuthType:
      return {
        ...prevState,
        profile: action.value,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default auth;
