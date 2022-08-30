type SlugToColor = {
  [key: string]: string;
};

const slugToIcon: SlugToColor = {
  github: "text",
  "github-readme-stats": "text",
  duckduckgo: "peach",
  nvim: "green",
  discord: "blue",
  vim: "green",
  alacritty: "peach",
  "gnome-terminal": "text",
  iterm: "green",
  "last.fm": "red",
  anilist: "blue",
  steam: "blue",
  spicetify: "green",
  "spotify-player": "green",
  "spotify-tui": "green",
  xcode: "blue",
  vscode: "blue",
  joplin: "blue",
  "windows-files": "yellow",
  tailwindcss: "sky",
  alfred: "mauve",
  thunderbird: "blue",
  hyper: "text",
  "dark-reader": "red",
  youtube: "red",
  libreddit: "cyan",
  chrome: "yellow",
  jetbrains: "text",
  kde: "blue",
  telegram: "blue",
  firefox: "red",
  "sublime-text": "yellow",
  "windows-terminal": "text",
  tmux: "green",
  monkeytype: "text",
  emacs: "blue",
  obsidian: "mauve",
  gtk: "green",
  lastfm: "red",
  insomnia: "blue",
};

export default function getIconColor(slug: string) {
  return slugToIcon[slug] || "text";
}
