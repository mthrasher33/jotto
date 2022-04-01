import axios from 'axios';

export const getSecretWord = () => {
  // TODO: actually integrate with redux/context
  return axios.get('http://localhost:3030').then((response) => response.data);
};
