import { promises as fs } from "fs";
import { currentMaintainers } from "../ports";
import sharp from "sharp";
import type { Collaborator } from "@catppuccin/catppuccin/resources/types/ports.porcelain.schema";

const MAINTAINERS_DIR = "src/data/maintainers";
const PUBLIC_MAINTAINERS_DIR = "public/maintainers";
const IMAGE_QUALITY = 80;
const REQUEST_SIZE = 256;
const SIZES = [64, 256];

const maintainersWithoutAvatars: string[] = [];

async function maintainersToFetch() {
  const existingFiles = await fs.readdir(MAINTAINERS_DIR);
  const existingMaintainers = new Set(existingFiles.map((file) => file.split(".")[0]));
  return currentMaintainers.filter((maintainer) => !existingMaintainers.has(maintainer.username));
}

async function fetchAndProcessImage(maintainer: Collaborator) {
  const response = await fetch(`${maintainer.url}.png?size=${REQUEST_SIZE}`);
  if (!response.ok) {
    console.warn(`Failed to fetch ${maintainer.url}: ${response.status} ${response.statusText}`);
    maintainersWithoutAvatars.push(maintainer.username);
    return;
  }

  const buffer = await response.arrayBuffer();

  await Promise.all(
    SIZES.map((size) =>
      sharp(buffer)
        .resize(size, size)
        .webp({ quality: IMAGE_QUALITY })
        .toFile(`${PUBLIC_MAINTAINERS_DIR}/${size}x${size}/${maintainer.username}.webp`),
    ),
  );
}

try {
  await fs.mkdir(MAINTAINERS_DIR, { recursive: true });

  console.info(`[INFO]: ${currentMaintainers.length} total maintainers`);
  const maintainers = await maintainersToFetch();
  console.info(`[INFO]: ${currentMaintainers.length - maintainers.length} maintainers already fetched`);
  console.info(`[INFO]: fetching ${maintainers.length} maintainers`);

  await Promise.all(maintainers.map((maintainer) => fetchAndProcessImage(maintainer)));

  await fs.writeFile(`${MAINTAINERS_DIR}/maintainersWithoutAvatars.json`, JSON.stringify(maintainersWithoutAvatars));
} catch (e) {
  console.error("Processing failed: ", e);
  process.exit(1);
}
