import axios from "axios";

class ChildService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "https://vaccapp.fly.dev",
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
    return this.api.post(`/family/${familyId}`, requestBody);
  }

  // POST vaccinationDate
  addDate(vaccineId, requestDate) {
    return this.api.put(`/child/vaccine/${vaccineId}`, requestDate);
  }

  // GET child vaccines in a month
  vaccinesAlert(childId) {
    return this.api.get(`/child/${childId}/calendar`);
  }

  // PUT /child/:id
  edit(childId, requestBody) {
    return this.api.put(`/child/${childId}`, requestBody);
  }
  //GET /child (para traer los hijos de una familia)
  getAll = (familyId) => {
    return this.api.get(`/family/${familyId}/children`);
  };

  //GET Child and Vaccine
  getBoth = (vaccineId) => {
    return this.api.get(`/child/vaccine/${vaccineId}`);
  };

  // GET /child/:childId
  getOne = (childId) => {
    return this.api.get(`/child/${childId}`);
  };

  // GET /child/:childId/sync
  getVacc = (childId) => {
    return this.api.get(`/child/${childId}/sync`);
  };
}

const childService = new ChildService();

export default childService;
