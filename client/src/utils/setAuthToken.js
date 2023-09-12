import axios from 'axios';

/**
 * Set Auth Token in Axios Header
 *
 * @param {String}    token
 *
 * @returns {null} This function returns null
 */
const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
