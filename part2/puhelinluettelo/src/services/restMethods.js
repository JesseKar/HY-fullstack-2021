import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(response => response.data)
}

const update = (id, newPerson) => {
    const req = axios.put(`${baseUrl}/${id}`, newPerson)
    return req.then(response => response.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req
}

export default { getAll, create, update, remove }