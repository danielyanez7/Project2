const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://wger.de/api/v2/'
        })
    }

    getAllExercises() {
        return this.api.get('/exercise')
    }

}

module.exports = ApiService