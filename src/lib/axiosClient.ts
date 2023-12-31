import axios from 'axios';
import IncomingMessage from 'next';

const Client = () => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://localhost:3000/',
      //headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/'
    });
  }
};

export default Client;
