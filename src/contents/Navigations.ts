import { CatppuccinLinks as links } from "./CatppuccinLinks";

export const header = [
  {
    title: "Home",
    target: "/",
    accent: "rosewater",
  },
  {
    title: "Ports",
    target: "ports",
    accent: "peach",
  },
  {
    title: "Palette",
    target: "palette",
    accent: "mauve",
  },
  {
    title: "Community",
    target: "community",
    accent: "green",
  },
];

export const footer = [
  {
    categoryTitle: "Project",
    categoryLinks: [
      {
        title: "Ports",
        target: "/ports",
        external: false,
      },
      {
        title: "Palette",
        target: "/palette",
        external: false,
      },
      {
        title: "Community",
        target: "/community",
        external: false,
      },
      {
        title: "Open Collective",
        target: links.opencollective,
        external: true,
      },
    ],
  },

  {
    categoryTitle: "Social",
    categoryLinks: [
      {
        title: "GitHub",
        target: links.github,
        external: true,
      },
      {
        title: "Discord",
        target: links.discord,
        external: true,
      },
      {
        title: "Mastodon",
        target: links.mastodon,
        external: true,
      },
      {
        title: "Twitter",
        target: links.twitter,
        external: true,
      },
      {
        title: "Twitch",
        target: links.twitch,
        external: true,
      },
      {
        title: "Instagram",
        target: links.instagram,
        external: true,
      },
    ],
  },
];
