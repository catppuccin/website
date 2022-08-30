import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export default async function GetPorts() {
  const pageOne = octokit.rest.repos
    .listForOrg({
      org: "catppuccin",
      type: "public",
      per_page: 100,
      page: 1,
    })
    .then(({ data }) => {
      return data
        .filter(
          ({ name }) =>
            ![
              "wallpapers",
              "toolbox",
              "catppuccin",
              ".github",
              "website",
              "discord-bot",
              "template",
              "palette",
            ].includes(name)
        )
        .sort(({ stargazers_count: a }, { stargazers_count: b }) => {
          if (b !== undefined && a !== undefined) {
            return b - a;
          } else {
            return 0;
          }
        });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  const pageTwo = octokit.rest.repos
    .listForOrg({
      org: "catppuccin",
      type: "public",
      per_page: 100,
      page: 2,
    })
    .then(({ data }) => {
      return data
        .filter(
          ({ name }) =>
            ![
              "wallpapers",
              "toolbox",
              "catppuccin",
              ".github",
              "website",
              "discord-bot",
              "template",
              "palette",
            ].includes(name)
        )
        .sort(({ stargazers_count: a }, { stargazers_count: b }) => {
          if (b !== undefined && a !== undefined) {
            return b - a;
          } else {
            return 0;
          }
        });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return Promise.all([pageOne, pageTwo]).then(([pageOne, pageTwo]) => {
    return [...pageOne, ...pageTwo];
  });
}
