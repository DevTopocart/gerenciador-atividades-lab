import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: "Bearer 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",
  },
});
