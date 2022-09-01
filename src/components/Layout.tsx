import type { ReactElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import PoweredByVercel from "./PoweredByVercel";
import Link from "next/link";

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
  }
]

export default function Layout({children, title}: {children: ReactElement, title?: string}): ReactElement {
  return (
    <>
      <Head>
        <title>{`Catppuccin Theme` + (title ? ` ${title}` : '')}</title>
      </Head>
      <main>
        <div className="h-48 anim-gradient flex flex-col">
          <div className="h-12 bg-mantle/70 backdrop-blur flex items-center w-screen fixed z-10">
            <ul className="flex uppercase font-bold text-lg max-w-3xl mx-auto gap-6 lg:gap-12">
              {navItems.map(({label, href}) => (
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
                <Image src="/500x500_circle.png" alt="Catppuccin Logo (round)" width={120} height={120}/>
              </a>
            </Link>
          </div>
        </div>
        {children}
      </main>
      <footer className="flex justify-center items-center">
        <PoweredByVercel/>
      </footer>
    </>
  )
}