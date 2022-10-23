import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  SiTwitter,
  SiDiscord,
  SiOpencollective,
  SiReddit,
  SiGithub,
} from "react-icons/si";
import { PoweredByVercel } from "./PoweredByVercel";
import React from "react";
import { HiExternalLink } from "react-icons/hi";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
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
    href: "/palette",
  },
  {
    label: "Donate",
    href: "https://donate.catppuccin.com",
    icon: (
      <HiExternalLink
        size={"20px"}
        style={{ display: "inline-block", marginLeft: "5px" }}
      />
    ),
  },
];

const socialItems: NavItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/catppuccin",
    icon: <SiGithub size={"100%"} />,
  },
  {
    label: "Discord",
    href: "https://discord.catppuccin.com",
    icon: <SiDiscord size={"100%"} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/catppuccintheme",
    icon: <SiTwitter size={"100%"} />,
  },
  {
    label: "Open Collective",
    href: "https://opencollective.com/catppuccin",
    icon: <SiOpencollective size={"100%"} />,
  },
  {
    label: "Reddit",
    href: "https://reddit.com/r/catppuccin",
    icon: <SiReddit size={"100%"} />,
  },
];

export const Layout = ({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}): JSX.Element => {
  const currentPath = useRouter().pathname;
  return (
    <>
      <Head>
        <title>{`Catppuccin` + (title ? ` ${title}` : "")}</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-crust">
        <div className="flex flex-col grow">
          <div className="h-48 anim-gradient flex flex-col">
            <div className="h-12 bg-mantle/30 backdrop-blur flex items-center w-screen fixed z-10">
              <ul className="flex font-epilogue text-lg max-w-3xl mx-auto gap-6 lg:gap-12">
                {navItems.map(({ label, href, icon }) => (
                  <li key={label}>
                    <Link href={href}>
                      {currentPath === href ? (
                        <a className="text-macchiato bg-mantle/10 p-2 rounded font-bold">
                          {label}
                        </a>
                      ) : (
                        <a className="text-macchiato font-bold hover:bg-mantle/10 hover:rounded focus:rounded duration-300 focus:bg-mantle/10 hover:text-macchiato p-2">
                          {label} {icon}
                        </a>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid place-items-center flex-grow mt-12">
              <Link href="/">
                <a>
                  <Image
                    src="/logo-round.png"
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
        <footer className="flex flex-col items-center max-w-3xl mx-auto py-6 gap-4 px-2">
          <div className="flex flex-col justify-center gap-4">
            <p>
              Copyright &copy; 2021-{new Date().getFullYear()}{" "}
              <span className="underline decoration-dotted underline-offset-2">
                <a
                  href="https://github.com/catppuccin"
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  Catppuccin Org
                </a>
              </span>
            </p>
            <ul className="flex flex-row mx-auto gap-2 lg:gap-4">
              {socialItems.map(({ label, href, icon }) => (
                <li
                  key={label}
                  className="duration-300 flex justify-center items-center text-center"
                >
                  <a
                    className="w-5 h-5 hover:scale-125 hover:text-rosewater ease-in-out duration-300"
                    href={href}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <PoweredByVercel />
        </footer>
      </div>
    </>
  );
};
