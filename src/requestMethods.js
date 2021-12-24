import axios from "axios";


const BASE_URL = "https://fast-atoll-26785.herokuapp.com/";



const TOKEN = localStorage.getItem("persist:root") &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.user.acessToken;


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});


