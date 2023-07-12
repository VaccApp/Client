import axios from "axios";

class FamilyService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  // POST /family
  create = async (requestBody) => {
    return this.api.post("/family", requestBody);
  };

  // GET /family
  list = async () => {
    return this.api.get("/family");
  };

  // GET /family/:id
  detail = async (id) => {
    return this.api.get(`/family/${id}`);
  };

  // PUT /family/:id
  edit = async (familyId, requestBody) => {
    return this.api.put(`/family/${familyId}`, requestBody);
  };

  // GET /family/:familyId/children
  children = async (familyId) => {
    return this.api.get(`/family/${familyId}/children`);
  };

  // DELETE /family/:id
  delete = async (id) => {
    return this.api.delete(`/family/${id}`);
  };
}

const familyService = new FamilyService();

export default familyService;
