import axios from "axios";
const token = localStorage.getItem("accessToken");
let accessToken = token ? token : "";
export const customAxios = axios.create({
  baseURL: "http://localhost:3001/",
  headers: { "x-access-token": accessToken },
});
