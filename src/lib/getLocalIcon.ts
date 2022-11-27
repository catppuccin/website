import {readFileSync} from "fs";

export default function getLocalIcon (slug: string): string {
  try {
    const data = readFileSync(`./public/icons/${slug}.svg`)
    return data.toString()
  } catch (e) {
    const data = readFileSync(`./public/icons/emboss-logo.svg`)
    return data.toString()
  }
}
