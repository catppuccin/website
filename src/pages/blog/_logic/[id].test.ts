import { expect, test } from "vitest";
import { formattedAuthors } from "./[id]";

const hammy = {
  name: "Hammy",
  github: "https://github.com/sgoudham",
};
const lemon = {
  name: "Lemon",
  github: "https://github.com/unseen-ninja",
};
const pigeon = {
  name: "Pigeon",
  github: "https://github.com/backwardspy",
};

test("format authors list when number of authors is one", () => {
  const expected = `<a href="https://github.com/https://github.com/sgoudham">Hammy</a>`;
  const actual = formattedAuthors([hammy]);
  expect(actual).toBe(expected);
});

test("format authors list when number of authors is two", () => {
  const expected = `<a href="https://github.com/https://github.com/sgoudham">Hammy</a> & <a href="https://github.com/https://github.com/unseen-ninja">Lemon</a>`;
  const actual = formattedAuthors([hammy, lemon]);
  expect(actual).toBe(expected);
});

test("format authors list when number of authors is three", () => {
  const expected = `<a href="https://github.com/https://github.com/sgoudham">Hammy</a>, <a href="https://github.com/https://github.com/unseen-ninja">Lemon</a> & <a href="https://github.com/https://github.com/backwardspy">Pigeon</a>`;
  const actual = formattedAuthors([hammy, lemon, pigeon]);
  expect(actual).toBe(expected);
});
