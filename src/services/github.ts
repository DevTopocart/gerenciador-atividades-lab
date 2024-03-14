import { GithubRelease } from "../interfaces";
import { githubApi } from "../repositories/github";

export async function getLatestRelease(): Promise<GithubRelease> {
  const response = await githubApi.get(
    "/repos/DevTopocart/gerenciador-atividades/releases",
  );
  return response.data[0];
}
