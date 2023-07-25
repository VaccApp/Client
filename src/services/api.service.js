import axios from "axios";

class VaccineApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "https://vaccapp.fly.dev",
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

  // GET /vaccine
  getVaccines = () => {
    return this.api.get(`/vaccines/calendar`);
  };

  //GET /vaccines/vaccineId

  getAVaccine = (vaccineId) => {
    return this.api.get(`/vaccines/${vaccineId}`);
  };
}

// Create one instance (object) of the service
const vaccineApiService = new VaccineApiService();

export default vaccineApiService;
