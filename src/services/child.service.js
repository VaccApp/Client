import axios from "axios";

class ChildService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /child
  addChild(familyId, requestBody) {
    return this.api.post(`family/${familyId}`, requestBody);
  }

  // GET /child
  getOne(id) {
    return this.api.get(`/child/${id}`);
  }

  // GET child vaccines in a month
  vaccinesAlert(childId) {
    return this.api.get(`/child/${childId}/calendar`);
  }
}

const childService = new ChildService();

export default childService;
