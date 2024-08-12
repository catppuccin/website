const PUBLIC_DIR = "public/maintainers";
const IMAGE_QUALITY = 80;
const REQUEST_SIZE = 256;
const SIZES = [64, 256];

import { $ } from "bun";
import { currentMaintainers, type Collaborator } from "./ports";

async function fetchAndProcessImage(maintainer: Collaborator) {
  const username = maintainer.url.split("/").pop();

  const response = await fetch(`${maintainer.url}.png?size=${REQUEST_SIZE}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${maintainer.url}: ${response.status} ${response.statusText}`);
  }
  const image = await response.blob();

  await Bun.write(`${PUBLIC_DIR}/${username}.png`, image);

  await Promise.all(SIZES.map((size) => $`mkdir -p ${PUBLIC_DIR}/${size}x${size}`));
  await Promise.all(
    SIZES.map(
      (size) =>
        $`convert ${PUBLIC_DIR}/${username}.png -resize ${size}x${size} -quality ${IMAGE_QUALITY} ${PUBLIC_DIR}/${size}x${size}/${username}.webp`,
    ),
  );
}

try {
  await Promise.all(currentMaintainers.map((maintainer) => fetchAndProcessImage(maintainer)));
} catch (e) {
  console.error("Processing failed: ", e);
  process.exit(1);
}

await $`rm ${PUBLIC_DIR}/*.png`;
