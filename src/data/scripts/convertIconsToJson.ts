import { promises as fs } from "fs";
import { importDirectory, cleanupSVG, runSVGO, parseColors, isEmptyColor } from "@iconify/tools";

const source = "src/data/icons";
const target = "src/data/icons.json";

const coloredIcons = ["magnifying-glass", "logo", "logo-text"];

(async () => {
  const iconSet = await importDirectory(source, {
    prefix: "ctp",
  });

  // Validate, clean up, fix palette and optimise
  iconSet.forEach((name, type) => {
    if (type !== "icon") {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);

      // Skip the colored SVGs from being monochrome
      if (!coloredIcons.includes(name)) {
        // Assume icon is monotone: replace color with currentColor, add if missing
        parseColors(svg, {
          defaultColor: "currentColor",
          callback: (_, colorStr, color) => {
            return !color || isEmptyColor(color) ? colorStr : "currentColor";
          },
        });
      }

      runSVGO(svg);
    } catch (err) {
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    iconSet.fromSVG(name, svg);
  });

  const exported = JSON.stringify(iconSet.export(), null, "\t") + "\n";
  await fs.writeFile(target, exported, "utf8");
})();
