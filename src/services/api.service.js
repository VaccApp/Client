import axios from "axios";

class VaccineApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "https://api-madrid.fly.dev",
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
  getVaccines() {
    return this.api.get(`/api/vaccines`);
  }

  getAVaccine(vaccineId) {
    return this.api.get(`/api/vaccines/${vaccineId}`);
  }
}

// Create one instance (object) of the service
const vaccineApiService = new VaccineApiService();

export default vaccineApiService;
