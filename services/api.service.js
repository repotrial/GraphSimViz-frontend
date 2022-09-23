import axios from 'axios'

const ApiService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data, callback) {
        return axios.post(resource, data, callback);
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    get_local_scores(data) {
        return this.post("/get_local_scores", data).then(response => {
            return response.data
        })
    },

    get_cluster_scores(data) {
        return this.post("/get_cluster_scores", data).then(response => {
            return response.data
        })
    },

    get_global_scores(data) {
        return this.post("/get_global_scores", data).then(response => {
            return response.data
        })
    },

}
export default ApiService
