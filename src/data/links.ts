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

export const socialsYml = (await fetch(
  "https://raw.githubusercontent.com/catppuccin/.github/refs/heads/main/socials/socials.yml",
)
  .then((r) => r.text())
  .then((t) => parse(t))) as SocialsSchema;
const socials = socialsYml.socials;

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

export const footerProjectLinks = [
  ...navigationLinks,
  {
    title: "Open Collective",
    target: "https://opencollective.com/catppuccin",
    external: true,
  },
];

const socialLinks = [
  socials.github,
  socials.discord,
  socials.mastodon,
  socials.twitter,
  socials.bsky,
  socials.spotify,
].map((link) => {
  return {
    title: link.name,
    target: link.url,
    external: true,
  };
});

const footerSocial = {
  categoryTitle: "Social",
  categoryLinks: socialLinks,
};

export const projectLinks = {
  categoryTitle: "Project",
  categoryLinks: footerProjectLinks,
};

export const footerLinks = [projectLinks, footerSocial];

export const githubUrl = socials.github.url;
