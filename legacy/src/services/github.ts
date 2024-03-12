import axios from "axios";
import { GithubRelease } from "../interfaces";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: "Bearer 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",
  },
});

export async function getLatestRelease(): Promise<GithubRelease> {
  const response = await githubApi.get(
    "/repos/DevTopocart/gerenciador-atividades/releases",
  );
  return response.data[0];
}
