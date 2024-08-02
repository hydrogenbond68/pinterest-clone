import axios from "axios";

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID jdZ3y5VLclK3yuWnuEq6vPqwVr6Qgi6jgUUWMnUGhwc",
    },
});
