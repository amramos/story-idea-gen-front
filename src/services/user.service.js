import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";

const getPublicContent = () => {
    axios.get(API_URL + "/test/all");
}

const getUserBoard = () => {
    const headers = {
        headers: authHeader()
    }
    axios.get(API_URL + "/test/user", headers);
}

const getAdminBoard = () => {
    const headers = {
        headers: authHeader()
    }
    axios.get(API_URL + "/test/admin", headers);
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
}

export default UserService;