const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://wger.de/api/v2'
        })
    }

    getAllExercises() {
        return this.api.get('/exercise/?language=4')
    }

    getExerciseInfo() {
        return this.api.get('/exerciseinfo')
    }

    getExerciseBaseInfo() {
        return this.api.get('/exercisebaseinfo')
    }

    getExerciseBase() {
        return this.api.get('/exercise-base')
    }

    getEquipment() {
        return this.api.get('/equipment')
    }

    getExerciseCategory() {
        return this.api.get('/exercisecategory')
    }

    getExerciseVideo() {
        return this.api.get('/video')
    }

    getExerciseImage() {
        return this.api.get('/exerciseimage')
    }
}

module.exports = ApiService