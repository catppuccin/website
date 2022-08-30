import {
  SiGithub,
  SiDuckduckgo,
  SiNeovim,
  SiVim,
  SiDiscord,
  SiAlacritty,
  SiIterm2,
  SiLastdotfm,
  SiAnilist,
  SiSteam,
  SiSpotify,
  SiXcode,
  SiVisualstudiocode,
  SiJoplin,
  SiWindows,
  SiTailwindcss,
  SiAlfred,
  SiThunderbird,
  SiHyper,
  SiDarkreader,
  SiYoutube,
  SiReddit,
  SiGooglechrome,
  SiJetbrains,
  SiKde,
  SiTelegram,
  SiFirefoxbrowser,
  SiSublimetext,
  SiWindowsterminal,
  SiTmux,
  SiGnuemacs,
  SiInsomnia
} from "react-icons/si";
import { FiCode } from "react-icons/fi";
import MonkeyType from "../icons/monkeytype.svg"
import GnomeTerminal from "../icons/gnometerminal.svg"
import Obsidian from "../icons/obsidian.svg"
import GTK from "../icons/gtk.svg"
import Kitty from "../icons/kitty.svg"

type SlugToIcon = {
  [key: string]: JSX.Element;
};

const slugToIcon: SlugToIcon = {
  github: SiGithub({
    size: "2.5rem",
  }),
  "github-readme-stats": SiGithub({
    size: "2.5rem",
  }),
  duckduckgo: SiDuckduckgo({
    size: "2.5rem",
  }),
  nvim: SiNeovim({
    size: "2.5rem",
  }),
  discord: SiDiscord({
    size: "2.5rem",
  }),
  vim: SiVim({
    size: "2.5rem",
  }),
  alacritty: SiAlacritty({
    size: "2.5rem",
  }),
  "gnome-terminal": GnomeTerminal(),
  iterm: SiIterm2({
    size: "2.5rem",
  }),
  lastfm: SiLastdotfm({
    size: "2.5rem",
  }),
  anilist: SiAnilist({
    size: "2.5rem",
  }),
  steam: SiSteam({
    size: "2.5rem",
  }),
  spicetify: SiSpotify({
    size: "2.5rem",
  }),
  "spotify-player": SiSpotify({
    size: "2.5rem",
  }),
  "spotify-tui": SiSpotify({
    size: "2.5rem",
  }),
  xcode: SiXcode({
    size: "2.5rem",
  }),
  vscode: SiVisualstudiocode({
    size: "2.5rem",
  }),
  joplin: SiJoplin({
    size: "2.5rem",
  }),
  "windows-files": SiWindows({
    size: "2.5rem",
  }),
  tailwindcss: SiTailwindcss({
    size: "2.5rem",
  }),
  alfred: SiAlfred({
    size: "2.5rem",
  }),
  thunderbird: SiThunderbird({
    size: "2.5rem",
  }),
  hyper: SiHyper({
    size: "2.5rem",
  }),
  "dark-reader": SiDarkreader({
    size: "2.5rem",
  }),
  youtube: SiYoutube({
    size: "2.5rem",
  }),
  libreddit: SiReddit({
    size: "2.5rem",
  }),
  chrome: SiGooglechrome({
    size: "2.5rem",
  }),
  jetbrains: SiJetbrains({
    size: "2.5rem",
  }),
  kde: SiKde({
    size: "2.5rem",
  }),
  telegram: SiTelegram({
    size: "2.5rem",
  }),
  firefox: SiFirefoxbrowser({
    size: "2.5rem",
  }),
  "sublime-text": SiSublimetext({
    size: "2.5rem",
  }),
  "windows-terminal": SiWindowsterminal({
    size: "2.5rem",
  }),
  tmux: SiTmux({
    size: "2.5rem",
  }),
  monkeytype: MonkeyType(),
  emacs: SiGnuemacs({
    size: "2.5rem",
  }),
  obsidian: Obsidian(),
  gtk: GTK(),
  insomnia: SiInsomnia({
    size: "2.5rem",
  }),
  kitty: Kitty(),
}

export default function getIcon(slug: string) {
  return slugToIcon[slug] || FiCode({ size: "2.5rem" });
}
