const axios = require("axios");

let axiosInstance;

if (process.env.NODE_ENV === "production") {
  axiosInstance = axios.create({
    baseURL: process.env.baseURL
  });
} else {
  axiosInstance = axios.create({
    baseURL: "http://localhost:5000/"
  });
}

module.exports = axiosInstance;
