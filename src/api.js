import axios from "axios";

class Api {
    async fetchData (url){
        await axios.get(url)
    }
}

export default new Api()