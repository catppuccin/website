import { promises as fs } from "fs";
import { rimraf } from "rimraf";
import { currentMaintainers, type Collaborator } from "../ports";
import { promisify } from "node:util";
import { exec as execCallback } from "node:child_process";
const exec = promisify(execCallback);

const PUBLIC_MAINTAINERS_DIR = "public/maintainers";
const DATA_DIR = "src/data";
const IMAGE_QUALITY = 80;
const REQUEST_SIZE = 256;
const SIZES = [64, 256];

const maintainersWithoutAvatars: string[] = [];

async function fetchAndProcessImage(maintainer: Collaborator) {
  const username = maintainer.url.split("/").pop();

  const response = await fetch(`${maintainer.url}.png?size=${REQUEST_SIZE}`);
  if (!response.ok) {
    console.warn(`Failed to fetch ${maintainer.url}: ${response.status} ${response.statusText}`);
    maintainersWithoutAvatars.push(maintainer.username);
    return;
  }

  await fs.writeFile(`${PUBLIC_MAINTAINERS_DIR}/${username}.png`, Buffer.from(await response.arrayBuffer()));
  await Promise.all(
    SIZES.map((size) =>
      exec(
        `convert ${PUBLIC_MAINTAINERS_DIR}/${username}.png -resize ${size}x${size} -quality ${IMAGE_QUALITY} ${PUBLIC_MAINTAINERS_DIR}/${size}x${size}/${username}.webp`,
      ),
    ),
  );
}

try {
  await Promise.all(SIZES.map((size) => fs.mkdir(`${PUBLIC_MAINTAINERS_DIR}/${size}x${size}`, { recursive: true })));
  await Promise.all(currentMaintainers.map((maintainer) => fetchAndProcessImage(maintainer)));
  await fs.writeFile(`${DATA_DIR}/maintainersWithoutAvatars.json`, JSON.stringify(maintainersWithoutAvatars));
} catch (e) {
  console.error("Processing failed: ", e);
  process.exit(1);
}

await rimraf(`${PUBLIC_MAINTAINERS_DIR}/*.png`, {
  glob: true,
});
