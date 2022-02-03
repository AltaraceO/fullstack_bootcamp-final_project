import axios from "axios";

const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const googleApi = axios.create({
  baseURL: `${PROXY_URL}${API_URL}`,
});

export default googleApi;
