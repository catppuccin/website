import { parse } from "yaml";

/**
 * Information about all the teams leading Catppuccin.
 *
 * @minItems 1
 */
export type AllLeadershipTeams = [LeadershipTeam, ...LeadershipTeam[]];
/**
 * The display name of the team.
 */
export type TeamName = string;
/**
 * The identifier of the team, which is the a machine-readable version of the team name.
 */
export type Identifier = string;
/**
 * The Catppuccin accent color attributed to the team.
 */
export type Color =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender";
/**
 * A short description of what the team is.
 */
export type Description = string;
/**
 * A list of items that the team is responsible for.
 */
export type Responsibilities = string;
/**
 * The display name of the member.
 */
export type DisplayName = string;
/**
 * The GitHub profile link of the member.
 */
export type GitHubProfile = string;
/**
 * List of all members in this team.
 */
export type CurrentMembers = {
  name: DisplayName;
  url: GitHubProfile;
}[];
/**
 * List of all members who used to be part of the team.
 */
export type PastMembers = {
  name: DisplayName;
  url: GitHubProfile;
}[];

export interface GovernanceSchema {
  leadership: AllLeadershipTeams;
}
export interface LeadershipTeam {
  name: TeamName;
  identifier: Identifier;
  color: Color;
  description: Description;
  responsibilities: Responsibilities;
  "current-members": CurrentMembers;
  "past-members": PastMembers;
}

const governanceYml = (await fetch(
  "https://raw.githubusercontent.com/catppuccin/.github/refs/heads/main/governance/governance.yml",
)
  .then((r) => r.text())
  .then((t) => parse(t))) as GovernanceSchema;

export const leadership = governanceYml.leadership;
