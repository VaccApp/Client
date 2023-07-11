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

  //GET /child (para traer los hijos de una familia)
  getAll(familyId) {
    return this.api.get(`/family/${familyId}/child)`);
  }

  // GET /child/:childId
  getOne(id) {
    return this.api.get(`/child/${id}`);
  }
}

const childService = new ChildService();

export default childService;
