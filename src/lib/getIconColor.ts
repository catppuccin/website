type RepoEntry = {
  icon?: string
  color?: string
}
export type RepoList = Record<string, RepoEntry>

export const getIconColor = (slug: string, repos: RepoList): string => {
  const color = repos[slug]?.color
  return color || "text";
}

export const getIconURL = (slug: string, repos: RepoList): string | null => {
  const icon = repos[slug]?.icon
  if(icon?.endsWith(".svg")) {
     return null
  } else  {
    let iconUrl = icon ? icon : slug
    return  `https://simpleicons.org/icons/${iconUrl}.svg`
  }
}