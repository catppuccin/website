import { FaClipboard } from "react-icons/fa";
import { useCopyToClipboard } from "../hooks";

export const CopyToClipboardBtn = ({ text }: { text: string }) => {
  const [value, copy] = useCopyToClipboard(500);
  return (
    <button
      onClick={() => copy(text)}
      className="flex items-center gap-2 bg-mantle rounded-lg p-2 text-text hover:bg-mantle/30 duration-300"
    >
      <FaClipboard className={value ? "animate-bounce duration-500" : ""} />
      <span className="sr-only">{value ? "Copied!" : "Copy"}</span>
    </button>
  );
};
