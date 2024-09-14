import { $ } from "bun";
import { currentMaintainers, type Collaborator } from "./ports";

const PUBLIC_DIR = "public/maintainers";
const LIB_DIR = "src/lib";
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
  const image = await response.blob();

  await Bun.write(`${PUBLIC_DIR}/${username}.png`, image);

  await Promise.all(
    SIZES.map(
      (size) =>
        $`convert ${PUBLIC_DIR}/${username}.png -resize ${size}x${size} -quality ${IMAGE_QUALITY} ${PUBLIC_DIR}/${size}x${size}/${username}.webp`,
    ),
  );
}

try {
  await Promise.all(SIZES.map((size) => $`mkdir -p ${PUBLIC_DIR}/${size}x${size}`));
  await Promise.all(currentMaintainers.map((maintainer) => fetchAndProcessImage(maintainer)));
  await Bun.write(`${LIB_DIR}/maintainersWithoutAvatars.json`, JSON.stringify(maintainersWithoutAvatars));

  // Only include placeholder assets in the public directory when we have failed
  // to retrieve GitHub profile information for at least one maintainer.
  if (maintainersWithoutAvatars.length > 0) {
    console.log("Transferring placeholder images to public directory...");
    await Promise.all(
      SIZES.map(
        (size) => $`cp ${LIB_DIR}/placeholder_${size}x${size}.webp ${PUBLIC_DIR}/${size}x${size}/placeholder.webp`,
      ),
    );
  }
} catch (e) {
  console.error("Processing failed: ", e);
  process.exit(1);
}

await $`rm ${PUBLIC_DIR}/*.png`;
