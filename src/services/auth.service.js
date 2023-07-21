import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "https://vaccapp.fly.dev/",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("https://vaccapp.fly.dev//auth/login");
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("https://vaccapp.fly.dev//auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("https://vaccapp.fly.dev//auth/verify");
  };

  profile = (id) => {
    return this.api.get(`/auth/${id}`);
  };

  edit = (id, requestBody) => {
    return this.api.put(`/auth/${id}`, requestBody);
  };

  delete = (id) => {
    return this.api.delete(`/auth/${id}`);
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
