import axios from "axios";

let localUrl = "http://localhost:5000/api";

if (process.env.NODE_ENV === "production") {
  localUrl = "/api";
}

export default axios.create({
  baseURL: localUrl,
});
