import { useTheme } from "next-themes";
import { useIsMounted } from "usehooks-ts";
import { FaMoon, FaSun, FaCloudMoon, FaCloudSun } from "react-icons/fa";

const flavours = {
  mocha: {
    name: "Mocha",
    icon: <FaMoon />,
  },
  macchiato: {
    name: "Macchiato",
    icon: <FaCloudMoon />,
  },
  frappe: {
    className: "frappe",
    icon: <FaCloudSun />,
  },
  latte: {
    className: "latte",
    icon: <FaSun />,
  },
};

const ThemeChanger = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return <></>;
  }

  return (
    <div>
      <button
        onClick={() => {
          const nextThemeIdx =
            (currentThemeIdx + 1) % Object.keys(flavours).length;
          setTheme(Object.keys(flavours)[nextThemeIdx] || "mocha");
        }}
      >
        {flavours[theme].icon}
      </button>
    </div>
  );
};

export default ThemeChanger;
