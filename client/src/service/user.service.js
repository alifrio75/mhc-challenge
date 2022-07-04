import axios from 'axios'
import { createContext } from "react";

const UserContext = createContext();

const SetAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
};

const UserLogin = async (payload) => {
    try {
        const req = await axios.post('/api/user/login', payload)
        return req
    } catch (error) {
        console.log(error)
    }
}

const FetchVendor = async () => {
    try {
        const req = await axios.get('/api/user/vendor')
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export {
    SetAuthToken,
    UserContext,
    UserLogin,
    FetchVendor
}