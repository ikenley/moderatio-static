import axios from "axios";

export default {
  configure: () => {
    axios.defaults.baseURL = location.hostname.startsWith("localhost") ? "https://localhost:5001" : "";
  },
};
