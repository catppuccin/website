import { parse } from "yaml";

export interface SocialsSchema {
  socials: SocialLinks;
}
/**
 * Links to all of the Catppuccin accounts on various social media platforms.
 */
export interface SocialLinks {
  [k: string]: Social;
}

export interface Social {
  /**
   * The name of the social media platform.
   */
  name: string;
  /**
   * The link to the Catppuccin account on that social media platform.
   */
  url: string;
}

const socials = (
  (await fetch("https://raw.githubusercontent.com/catppuccin/.github/refs/heads/main/socials/socials.yml")
    .then((r) => r.text())
    .then((t) => parse(t))) as SocialsSchema
).socials;

export const navigationLinks = [
  {
    title: "Ports",
    target: "/ports",
    accent: "peach",
    external: false,
  },
  {
    title: "Palette",
    target: "/palette",
    accent: "mauve",
    external: false,
  },
  {
    title: "Community",
    target: "/community",
    accent: "green",
    external: false,
  },
  {
    title: "Blog",
    target: "/blog",
    accent: "blue",
    external: false,
  },
];

export const footerLinks = [
  {
    categoryTitle: "Project",
    categoryLinks: [
      ...navigationLinks,
      {
        title: "Open Collective",
        target: "https://opencollective.com/catppuccin",
        external: true,
      },
    ],
  },
  {
    categoryTitle: "Social",
    categoryLinks: [
      socials.github,
      socials.discord,
      socials.mastodon,
      socials.twitter,
      socials.bsky,
      socials.spotify,
    ].map((link) => ({
      title: link.name,
      target: link.url,
      external: true,
    })),
  },
];

export const githubUrl = socials.github.url;
