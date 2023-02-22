const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://wger.de/api/v2'
        })
    }

    getAllExercises() {
        return this.api.get('/exerciseinfo/?limit=1200')
    }

}

module.exports = ApiService