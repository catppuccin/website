import { variants } from "@catppuccin/palette";
import { Layout } from "../components";
import { GetStaticProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { capitalize, convertTo } from "../lib/utils";
import { calculateContrastColor } from "../lib/colormath";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

const formats = ["Hex", "RGB", "HSL", "HSV", "Lab"];

export default function PalettePage({
  palette,
}: {
  palette: any;
}): JSX.Element {
  const [selectedFlavour, setSelectedFlavour] = useState("mocha");
  const [selectedFormat, setSelectedFormat] = useState("Hex");
  const [value, copy] = useCopyToClipboard();

  return (
    <Layout title="Palette">
      <div className="max-w-4xl mx-auto px-2">
        <div className="prose py-4">
          <h2 className="m-0 mb-2">Palettes</h2>
          <p>
            Catppuccin consists of 4 beautiful pastel color palettes. All the
            details can be found below. To make the best use them please refer
            to the{" "}
            <Link href="https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md">
              style guide.
            </Link>
          </p>
        </div>
        <div className="flex items-baseline justify-start gap-2 mb-2">
          <div>
            <label
              htmlFor="flavour"
              className="block text-sm font-medium text-subtext0"
            >
              Flavour
            </label>
            <select
              id="flavour"
              onChange={(e) => {
                setSelectedFlavour(e.target.value.toLowerCase());
              }}
              defaultValue="Mocha"
              className="mt-1 block w-full rounded-md border-crust py-2 pl-3 pr-10 text-text focus:border-rosewater focus:outline-none focus:ring-rosewater sm:text-sm bg-mantle"
            >
              {Object.keys(palette).map((flavour) => {
                return <option key={flavour}>{capitalize(flavour)}</option>;
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-subtext0"
            >
              Format
            </label>
            <select
              id="format"
              onChange={(e) => {
                setSelectedFormat(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-crust py-2 pl-3 pr-10 text-text focus:border-rosewater focus:outline-none focus:ring-rosewater sm:text-sm bg-mantle"
            >
              {formats.map((format) => {
                return <option key={format}>{format}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {Object.entries(palette[selectedFlavour]).map(
              ([colourName, hexCode], colourIdx) => {
                const format = convertTo(hexCode as string, selectedFormat);
                colourName = capitalize(colourName);
                return (
                  <button
                    key={colourIdx}
                    className="p-1 hover:outline hover:scale-105 transition-transform outline-white outline-1"
                    onClick={() => {
                      if (typeof hexCode === "string") {
                        copy(hexCode);
                      }
                      toast(`${colourName} copied to clipboard!`);
                    }}
                    style={{
                      background: hexCode as string,
                      color: calculateContrastColor(hexCode as string),
                    }}
                  >
                    <div>{colourName}</div>
                    <div>{format}</div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const palette = Object.entries(variants)
    .map(([key, value]) => {
      return {
        [key]: Object.fromEntries(
          Object.entries(value).map(([key, value]) => {
            return [key, value.hex];
          })
        ),
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return {
    props: {
      palette,
    },
  };
};
