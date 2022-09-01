import {Octokit} from "@octokit/rest";

const octokit = new Octokit();

export default async function GetPorts() {
  return octokit.paginate(octokit.rest.repos
    .listForOrg, {
    org: "catppuccin",
    type: "public",
  })
    .then((data) => {
      return data
        .filter(
          ({topics = []}) => {
            return !topics.includes("catppuccin-meta")
          }
        )
        .sort(({stargazers_count: a}, {stargazers_count: b}) => {
          if (b !== undefined && a !== undefined) {
            return b - a;
          } else {
            return 0;
          }
        });
    })
    .catch((err) => {
      return err;
    });
}
