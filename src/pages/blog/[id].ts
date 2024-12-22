import type { BlogAuthor } from "src/content.config";

const toLink = (author: BlogAuthor) => `<a href="https://github.com/${author.github}">${author.name}</a>`;

export const formattedAuthors = (list: BlogAuthor[]) => {
  if (list.length === 1) {
    return toLink(list[0]);
  } else if (list.length === 2) {
    return `${toLink(list[0])} & ${toLink(list[1])}`;
  } else {
    return `${list
      .slice(0, -1)
      .map((i) => toLink(i))
      .join(", ")} & ${toLink(list[list.length - 1])}`;
  }
};

export const formattedDatePosted = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
