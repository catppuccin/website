import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export default async function GetPorts() {
  return octokit.rest.repos
    .listForOrg({
      org: "catppuccin",
      type: "public",
      per_page: 100,
    })
    .then(({ data }) => {
      return data.filter(
        ({ name }) =>
          ![
            "wallpapers",
            "toolbox",
            "catppuccin",
            ".github",
            "website",
            "discord-bot",
            "template",
          ].includes(name)
      );
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
