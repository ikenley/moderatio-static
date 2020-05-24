import axios from "axios";

export default {
  configure: (authToken) => {
    axios.defaults.baseURL = location.hostname.startsWith("localhost")
      ? "https://localhost:5001"
      : "https://l40yord0fh.execute-api.us-east-1.amazonaws.com/Prod";

    axios.defaults.headers = {
      Authorization: `Bearer ${authToken ? authToken : null}`,
    };
  },
};
