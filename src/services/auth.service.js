import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";

const login = async (username, password) => {
    
    return axios
            .post(API_URL + "/auth/signin", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            })
}

const logout = () => {
    localStorage.removeItem("user");
}

const register = (username, email, password) => {
    return axios
        .post(API_URL + "/auth/signup", {
            username,
            email,
            password
        })
}

const AuthService = {
    login,
    logout,
    register,
}

export default AuthService;