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
  const existingFiles = await fs.readdir(`${PUBLIC_MAINTAINERS_DIR}/${REQUEST_SIZE}x${REQUEST_SIZE}`);
  const existingMaintainers = new Set(existingFiles.map((file) => file.split(".")[0]));
  return currentMaintainers.filter((maintainer) => !existingMaintainers.has(maintainer.username));
}

async function fetchAndProcessImage(maintainer: Collaborator) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 500;
  let response;
  let avatarUrl: string;

  try {
    const apiResponse = await fetch(`https://api.github.com/users/${maintainer.username}`);
    if (!apiResponse.ok) {
      console.warn(`Failed to fetch GitHub API for ${maintainer.username}: ${apiResponse.status}`);
      maintainersWithoutAvatars.push(maintainer.username);
      return;
    }
    const userData = await apiResponse.json();
    avatarUrl = userData.avatar_url;
  } catch (error) {
    console.warn(
      `Failed to get avatar URL for ${maintainer.username}:`,
      error instanceof Error ? error.message : String(error),
    );
    maintainersWithoutAvatars.push(maintainer.username);
    return;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      response = await fetch(avatarUrl);
      break;
    } catch (error) {
      console.warn(`Attempt ${attempt}/${MAX_RETRIES} failed for ${maintainer.username}`);
      if (attempt === MAX_RETRIES) {
        maintainersWithoutAvatars.push(maintainer.username);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  if (!response!.ok) {
    console.warn(`Failed to fetch avatar for ${maintainer.username}: ${response!.status}`);
    maintainersWithoutAvatars.push(maintainer.username);
    return;
  }

  try {
    const buffer = await response!.arrayBuffer();

    await Promise.all(
      SIZES.map((size) =>
        sharp(buffer)
          .resize(size, size)
          .webp({ quality: IMAGE_QUALITY })
          .toFile(`${PUBLIC_MAINTAINERS_DIR}/${size}x${size}/${maintainer.username}.webp`),
      ),
    );
  } catch (error) {
    console.error(`Failed to process ${maintainer.username}:`, error instanceof Error ? error.message : String(error));
    maintainersWithoutAvatars.push(maintainer.username);
  }
}

try {
  await fs.mkdir(MAINTAINERS_DIR, { recursive: true });

  console.info(`[INFO]: ${currentMaintainers.length} total maintainers`);
  const maintainers = await maintainersToFetch();
  console.info(`[INFO]: ${currentMaintainers.length - maintainers.length} maintainers already fetched`);
  console.info(`[INFO]: fetching ${maintainers.length} maintainers`);

  await Promise.all(maintainers.map((maintainer) => fetchAndProcessImage(maintainer)));
  maintainersWithoutAvatars.push("__placeholder__");
  await fs.writeFile(`${MAINTAINERS_DIR}/maintainersWithoutAvatars.json`, JSON.stringify(maintainersWithoutAvatars));
} catch (e) {
  console.error("Processing failed: ", e);
  process.exit(1);
}
