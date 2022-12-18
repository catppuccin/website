import { variants } from "@catppuccin/palette";
import { CopyToClipboardBtn, Layout } from "../components";
import { GetStaticProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { capitalize, convertTo } from "../lib/utils";

const formats = ["Hex", "RGB", "HSL", "HSV", "Lab"];

export default function PalettePage({
  palette,
}: {
  palette: any;
}): JSX.Element {
  const [selectedFlavour, setSelectedFlavour] = useState("mocha");
  const [selectedFormat, setSelectedFormat] = useState("Hex");

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
              <a>style guide.</a>
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
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">‎</th>
              <th className="text-left">Label</th>
              <th className="text-left">{selectedFormat}</th>
              <th className="text-left">‎</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(palette[selectedFlavour]).map(
              ([colourName, hexCode], colourIdx) => {
                const format = convertTo(hexCode as string, selectedFormat);
                return (
                  <tr
                    key={colourName}
                    className={
                      colourIdx % 2 === 0
                        ? "rounded p-2"
                        : "bg-mantle/50 rounded p-2"
                    }
                  >
                    <td className={`${selectedFlavour} py-2`}>
                      <div
                        className={`rounded-full w-4 h-4 bg-${colourName}`}
                      />
                    </td>
                    <td>{capitalize(colourName)}</td>
                    <td>
                      <code className="font-fira bg-transparent">{format}</code>
                    </td>
                    <td>
                      <CopyToClipboardBtn text={format} />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
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
