import cache from "memory-cache";
import axios from "axios";

const allowListURL =
  "https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/url-allowlist.txt";

const getAllowedURLS = async (): Promise<[string]> => {
  if (cache.get("allowlist")) {
    return cache.get("allowlist");
  } else {
    return await axios
      .get(allowListURL)
      .then((response) => {
        const parsed = response.data.toString().split("\n");
        cache.put("allowlist", parsed);
        return parsed;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }
};

export default getAllowedURLS;
