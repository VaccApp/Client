import axios from "axios";

class VaccineService {
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

  // GET /vaccine
  getOne(vaccineId) {
    return this.api.get(`vaccines/${vaccineId}`);
  }

  // POST /vaccine
  vaccinate(childId, requestBody) {
    return this.api.post(`vaccines/${childId}`, requestBody);
  }

  // PUT /vaccine/:id
  edit(vaccineId, requestBody) {
    return this.api.put(`vaccines/${vaccineId}`, requestBody);
  }
}

// Create one instance (object) of the service
const vaccineService = new VaccineService();

export default vaccineService;
