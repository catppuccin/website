import Head from "next/head";
import Image from "next/image";
import PoweredByVercel from "./PoweredByVercel";
import Link from "next/link";

import {
  SiTwitter,
  SiDiscord,
  SiOpencollective,
  SiReddit,
  SiGithub,
} from "react-icons/si";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Ports",
    href: "/ports",
  },
  {
    label: "Palette",
    href: "#",
  },
  {
    label: "Donate",
    href: "https://donate.catppuccin.com",
  },
];

const socialItems = [
  {
    label: "GitHub",
    href: "https://github.com/catppuccin",
    icon: <SiGithub />,
  },
  {
    label: "Discord",
    href: "https://discord.catppuccin.com",
    icon: <SiDiscord />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/catppuccintheme",
    icon: <SiTwitter />,
  },
  {
    label: "Open Collective",
    href: "https://opencollective.com/catppuccin",
    icon: <SiOpencollective />,
  },
  {
    label: "Reddit",
    href: "https://reddit.com/r/catppuccin",
    icon: <SiReddit />,
  },
];

export default function Layout({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Catppuccin` + (title ? ` ${title}` : "")}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col grow">
          <div className="h-48 anim-gradient flex flex-col">
            <div className="h-12 bg-mantle/70 backdrop-blur flex items-center w-screen fixed z-10">
              <ul className="flex uppercase font-bold text-lg max-w-3xl mx-auto gap-6 lg:gap-12">
                {navItems.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}>
                      <a>{label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid place-items-center flex-grow mt-12">
              <Link href="/">
                <a>
                  <Image
                    src="/500x500_circle.png"
                    alt="Catppuccin Logo (round)"
                    width={120}
                    height={120}
                  />
                </a>
              </Link>
            </div>
          </div>
          {children}
        </div>
        <footer className="flex flex-col md:flex-row justify-between w-full items-center max-w-4xl mx-auto py-6 gap-4">
          <span>
            Copyright &copy; 2021-{new Date().getFullYear()} Catppuccin Org
          </span>
          <ul className="flex flex-row gap-2 lg:gap-4">
            {socialItems.map(({ label, href, icon }) => (
              <li key={label}>
                <Link href={href} rel="nofollow noreferrer" target="_blank">
                  <a className="block w-5 h-5">{icon}</a>
                </Link>
              </li>
            ))}
          </ul>
          <PoweredByVercel />
        </footer>
      </div>
    </>
  );
}
