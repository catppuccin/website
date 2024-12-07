import { promises as fs } from "fs";
import { cleanupSVG, parseColors, isEmptyColor, runSVGO, deOptimisePaths, importDirectory } from "@iconify/tools";

(async () => {
  const source = "src/icons/ports";
  const prefix = "ctp";
  const target = "src/lib/iconify/icons.json";

  // Load icon set
  const iconSet = await importDirectory(source, { prefix });

  // Parse all icons
  await iconSet.forEach((name, type) => {
    // Do not parse aliases
    if (type !== "icon") {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      return;
    }

    // This will throw an exception if icon is invalid
    cleanupSVG(svg);

    parseColors(svg, {
      defaultColor: "currentColor",
      callback: (_, colorStr, color) => {
        return !color || isEmptyColor(color) ? colorStr : "currentColor";
      },
    });

    // Optimise
    runSVGO(svg);

    // Update paths for compatibility with old software
    deOptimisePaths(svg);

    // SVG instance is detached from icon set, so changes to
    // icon are not stored in icon set automatically.

    // Update icon in icon set
    iconSet.fromSVG(name, svg);
  });

  // Save icon set
  const iconSetContent = iconSet.export();
  await fs.writeFile(target, JSON.stringify(iconSetContent, null, 2), "utf8");
})();
