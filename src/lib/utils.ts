import convert from "color-convert";

export const capitalize = (str: string | undefined) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertTo = (color: string, format: string): string => {
  switch (format) {
    case "RGB":
      return convert.hex.rgb(color).join(", ");
    case "HSL":
      return convert.hex.hsl(color).join(", ");
    case "HSV":
      return convert.hex.hsv(color).join(", ");
    case "Lab":
      return convert.hex.lab(color).join(", ");
    case "Hex":
    default:
      return color;
  }
};

export const getCurrentEnv = () => {
  return process.env.NODE_ENV;
};

export const getCurrentApiBaseUrl = () => {
  console.log(getCurrentEnv());
  console.log(process.env.VERCEL_URL);
  if (getCurrentEnv() === "development") {
    return "http://localhost:3000/api";
  }

  return `https://${process.env.VERCEL_URL}/api`;
};
