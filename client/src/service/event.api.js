import axios from "axios";

const getAllEvent = async (companyId = '', status = '') => {
    const buildParam = `${status && `/?status=${status}`}`
    const reqApi = await axios.get(`/api/event/${companyId}${buildParam}`)
    return reqApi.data
}

const createNewEvent = async (payload) => {
    const reqApi = await axios.post(`/api/event/create`, payload)
    return reqApi
}

const editEvent = async (payload, query) => {
    const reqApi = await axios.put(`/api/event/${query}`, payload)
    return reqApi
}


export {
    getAllEvent,
    createNewEvent,
    editEvent
}