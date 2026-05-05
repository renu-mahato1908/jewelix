import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

const register = (firstName:string, lastName:string, username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    username,
    email,
    password,
  });
};

const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL + "signin", {
    username,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

