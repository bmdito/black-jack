import axios from "axios";

export default {
  userRegister: function(data) {
    return axios.post("/api/users", data);
  },

  userLogin: function(data) {
    return axios.post("/api/auth", data);
  }
};
