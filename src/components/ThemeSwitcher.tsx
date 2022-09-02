import { useTheme } from "next-themes";
import {useIsMounted} from "usehooks-ts";

const flavours = [
  {
    name: "Mocha",
    className: "mocha",
  },
  {
    name: "Macchiato",
    className: "macchiato",
  },
  {
    name: "Frappé",
    className: "frappe",
  },
  {
    name: "Latte",
    className: "latte",
  },
];

const ThemeChanger = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted()

  if (!mounted) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-crust p-4 text-text shadow">
      {flavours.map((flavour) => (
        <button
          key={flavour.name}
          className={`${flavour.className} group flex items-baseline justify-between rounded-lg border border-crust bg-base p-2 text-text transition-transform hover:scale-110`}
          onClick={() => setTheme(flavour.className)}
        >
          <span>{flavour.name}</span>
          {theme === flavour.className && (
            <span className="h-3 w-3 rounded-full bg-rosewater group-hover:animate-bounce" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeChanger;