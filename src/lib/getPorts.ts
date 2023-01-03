import { Octokit } from "@octokit/rest";
import cache from "memory-cache";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN || "" });

export default async function GetPorts() {
  if (cache.get("repolist") !== null) {
    return cache.get("repolist");
  } else {
    const data = octokit
      .paginate(octokit.rest.repos.listForOrg, {
        org: "catppuccin",
        type: "public",
      })
      .then((data) => {
        return data
          .filter(({ topics = [], visibility }) => {
            const isMeta = topics.includes("catppuccin-meta");
            const isPrivate = visibility === "private";
            return !(isMeta && isPrivate);
          })
          .sort(({ stargazers_count: a }, { stargazers_count: b }) => {
            if (b !== undefined && a !== undefined) {
              return b - a;
            } else {
              return 0;
            }
          })
          .map(
            ({
              name,
              description,
              html_url,
              stargazers_count,
              forks_count,
              topics,
              default_branch,
            }) => {
              return {
                name,
                description,
                html_url,
                stargazers_count,
                forks_count,
                topics,
                default_branch,
              };
            }
          );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    await cache.put("repolist", data);
    return data;
  }
}
